/*
  # Create Company Management Schema

  1. New Tables
    - `companies` - Company profiles and information
    - `job_listings` - Job listings created by companies
    - `company_projects` - Projects managed by companies
    - `project_workers` - Workers assigned to projects
    - `company_messages` - Messages between companies and workers
    - `worker_applications` - Applications from workers to job listings
  
  2. Security
    - Enable RLS on all tables
    - Add policies for company access control
*/

CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  business_type text,
  registration_number text,
  year_established text,
  company_address text,
  contact_number text,
  company_email text NOT NULL UNIQUE,
  profile_picture_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  position_name text NOT NULL,
  position_title text NOT NULL,
  required_count integer NOT NULL DEFAULT 1,
  time_in text,
  time_out text,
  salary_per_day decimal,
  total_work_days integer,
  progress_percentage integer DEFAULT 0,
  location text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS company_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  project_name text NOT NULL,
  status text DEFAULT 'ongoing',
  construction_start text,
  construction_end text,
  total_work_days integer,
  completed_work_days integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_workers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES company_projects(id) ON DELETE CASCADE,
  worker_id uuid NOT NULL,
  worker_name text NOT NULL,
  worker_role text NOT NULL,
  hired_date timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS company_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  worker_id uuid NOT NULL,
  sender_id uuid NOT NULL,
  sender_type text NOT NULL CHECK (sender_type IN ('company', 'worker')),
  message_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS worker_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,
  worker_id uuid NOT NULL,
  worker_name text NOT NULL,
  status text DEFAULT 'pending',
  applied_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Companies can view own data"
  ON companies FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Companies can update own data"
  ON companies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Companies can insert own company"
  ON companies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Job listings are viewable by company"
  ON job_listings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = job_listings.company_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Companies can manage own listings"
  ON job_listings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = job_listings.company_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Company projects are viewable by company"
  ON company_projects FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = company_projects.company_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Companies can manage own projects"
  ON company_projects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM companies
      WHERE companies.id = company_projects.company_id
      AND companies.user_id = auth.uid()
    )
  );
