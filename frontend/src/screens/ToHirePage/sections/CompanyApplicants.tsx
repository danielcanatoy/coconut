import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";

interface Applicant {
  application_id: number;
  first_name: string; // Match sa SQL Alias
  last_name: string;  // Match sa SQL Alias
  job_title: string;  // Match sa SQL Alias
  status: 'Pending' | 'Approved' | 'Rejected';
  applied_at: string;
  mobile_number: string;
  skills: string; 
}

export const CompanyApplicants = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'Approved' | 'Rejected'>('Approved');
  const [panelVisible, setPanelVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Gamitin muna natin ang query param approach dahil yun ang nasa route mo
  const employerId = 1; 

  // 1. Clock functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
      }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // 2. Fetch Applicants
  const fetchApplicants = async () => {
    try {
      setLoading(true);
      // Sinunod ko ang URL structure sa huling route na ginawa natin
      const res = await fetch(`http://localhost:5000/api/company/applicants?employer_id=${employerId}`);
      const data = await res.json();
      setApplicants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // 3. Decision Handler
  const handleDecision = async (id: number, decision: 'Approved' | 'Rejected') => {
    try {
      const response = await fetch(`http://localhost:5000/api/company/applications/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: decision }),
      });

      if (response.ok) {
        // Update local state para agad mawala sa listahan
        setApplicants(prev => prev.map(app => 
          app.application_id === id ? { ...app, status: decision } : app
        ));
        alert(`Worker has been ${decision.toLowerCase()}!`);
      }
    } catch (error) {
      console.error("Decision error:", error);
    }
  };

  const pendingApplicants = applicants.filter(a => a.status === "Pending");
  const historyApplicants = applicants.filter(a => a.status === selectedStatus);

  return (
    <div className="relative flex flex-col gap-6 p-4">
      {/* Header & Clock */}
      <div className="flex items-center justify-end w-full">
        <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 font-medium text-lg">
          {currentTime}
        </span>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-normal text-black text-lg bg-[#FF9D00] px-6 py-2 rounded-full shadow-md">
            Job Applicants
          </h1>
          <button
            onClick={() => setPanelVisible(true)}
            className="text-lg px-6 py-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all"
          >
            Approval History
          </button>
        </div>

        <Card className="bg-white border-none rounded-[20px] shadow-lg w-full">
          <CardContent className="p-6">
            <div className="space-y-3">
              {loading ? (
                <p className="text-center py-10">Loading applicants...</p>
              ) : pendingApplicants.length > 0 ? (
                pendingApplicants.map((applicant) => (
                  <div key={applicant.application_id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                    <div className="flex-1">
                      {/* DITO ANG PAGBABAGO: first_name at last_name */}
                      <p className="font-bold text-black text-lg">
                        {applicant.first_name} {applicant.last_name}
                      </p>
                      <p className="text-gray-700 text-sm italic">
                        Applying for: <span className="font-semibold text-black">{applicant.job_title}</span>
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Applied: {new Date(applicant.applied_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleDecision(applicant.application_id, 'Approved')}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 font-bold text-xs"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleDecision(applicant.application_id, 'Rejected')}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 font-bold text-xs"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-gray-400">No pending applicants</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HISTORY MODAL */}
      {panelVisible && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="bg-[#FF9D00] p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Approval History</h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedStatus('Approved')} 
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedStatus === 'Approved' ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
                >
                  Approved
                </button>
                <button 
                  onClick={() => setSelectedStatus('Rejected')} 
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedStatus === 'Rejected' ? 'bg-red-500 text-white' : 'bg-white text-black'}`}
                >
                  Rejected
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[400px]">
              <table className="w-full text-left">
                <thead className="border-b-2 border-gray-100">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Position</th>
                    <th className="py-3 px-4">Status Date</th>
                  </tr>
                </thead>
                <tbody>
                  {historyApplicants.map((h) => (
                    <tr key={h.application_id} className="border-b">
                      <td className="py-3 px-4">{h.first_name} {h.last_name}</td>
                      <td className="py-3 px-4">{h.job_title}</td>
                      <td className="py-3 px-4">{new Date(h.applied_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {historyApplicants.length === 0 && <p className="text-center py-10 text-gray-400">No records found.</p>}
            </div>

            <div className="p-6 border-t">
              <Button onClick={() => setPanelVisible(false)} className="w-full bg-gray-200 text-black hover:bg-gray-300">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};