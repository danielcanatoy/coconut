import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Applicant {
  application_id: number;
  first_name: string;
  last_name: string;
  job_title: string;
  status: "Pending" | "Approved" | "Rejected";
  applied_at: string;
  mobile_number: string;
  skills: string;
  experience: string;
}

export const CompanyApplicants = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<"Approved" | "Rejected">("Approved");
  const [panelVisible, setPanelVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/company";
  const token = localStorage.getItem("token");

  // 1. Clock Logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
      }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // 2. Fetch Applicants (Isang version na lang at may Error Handling)
  const fetchApplicants = useCallback(async () => {
    if (!token) {
      console.error("No token found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/applicants`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplicants(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.error("Unauthorized: Token might be expired.");
      } else {
        console.error("Fetch Error:", err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [token, API_URL]);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  // 3. Decision Handler
  const handleDecision = async (id: number, decision: "Approved" | "Rejected") => {
    try {
      const response = await axios.put(
        `${API_URL}/applications/${id}/status`,
        { status: decision },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setApplicants((prev) =>
          prev.map((app) => (app.application_id === id ? { ...app, status: decision } : app))
        );
        alert(`Worker application has been ${decision}!`);
      }
    } catch (error) {
      console.error("Decision error:", error);
      alert("Failed to update status.");
    }
  };

  const pendingApplicants = applicants.filter((a) => a.status === "Pending");
  const historyApplicants = applicants.filter((a) => a.status === selectedStatus);

  return (
    <div className="relative flex flex-col gap-6 p-4">
      <div className="flex items-center justify-end w-full">
        <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 font-medium text-lg tabular-nums">
          {currentTime || "00:00:00 AM"}
        </span>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-white text-lg bg-[#FF9D00] px-6 py-2 rounded-full shadow-md">
            Job Applicants
          </h1>
          <button
            onClick={() => setPanelVisible(true)}
            className="text-lg px-6 py-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all font-medium"
          >
            Approval History
          </button>
        </div>

        <Card className="bg-white border-none rounded-[20px] shadow-lg w-full min-h-[300px]">
          <CardContent className="p-6">
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-20 text-[#FF9D00]">Loading...</div>
              ) : pendingApplicants.length > 0 ? (
                pendingApplicants.map((applicant) => (
                  <div key={applicant.application_id} className="flex flex-wrap items-center justify-between p-5 border border-gray-100 rounded-2xl hover:border-[#FF9D00]/30 transition-all shadow-sm">
                    <div className="flex-1 min-w-[250px]">
                      <p className="font-bold text-gray-900 text-xl">{applicant.first_name} {applicant.last_name}</p>
                      <p className="text-gray-600 font-medium mt-1">Applying for: <span className="text-[#FF9D00]">{applicant.job_title}</span></p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>Experience: {applicant.experience}</span>
                        <span>•</span>
                        <span>Applied: {new Date(applicant.applied_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => handleDecision(applicant.application_id, "Approved")} className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 font-bold">Approve</Button>
                      <Button onClick={() => handleDecision(applicant.application_id, "Rejected")} className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-6 font-bold">Reject</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">No pending applicants</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HISTORY MODAL */}
      {panelVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
            <div className="bg-[#FF9D00] p-6 flex items-center justify-between text-white">
              <h3 className="text-2xl font-bold">Approval History</h3>
              <div className="flex gap-2">
                <button onClick={() => setSelectedStatus("Approved")} className={`px-5 py-2 rounded-full text-sm font-bold ${selectedStatus === "Approved" ? "bg-green-500 text-white" : "bg-white text-black"}`}>Approved</button>
                <button onClick={() => setSelectedStatus("Rejected")} className={`px-5 py-2 rounded-full text-sm font-bold ${selectedStatus === "Rejected" ? "bg-red-500 text-white" : "bg-white text-black"}`}>Rejected</button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left">
                <thead className="border-b-2">
                  <tr>
                    <th className="py-4 px-4 text-gray-500">Name</th>
                    <th className="py-4 px-4 text-gray-500">Position</th>
                    <th className="py-4 px-4 text-gray-500">Date Applied</th>
                  </tr>
                </thead>
                <tbody>
                  {historyApplicants.map((h) => (
                    <tr key={h.application_id} className="border-b">
                      <td className="py-4 px-4 font-bold">{h.first_name} {h.last_name}</td>
                      <td className="py-4 px-4">{h.job_title}</td>
                      <td className="py-4 px-4">{new Date(h.applied_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t"><Button onClick={() => setPanelVisible(false)} className="w-full bg-gray-900 text-white">Close</Button></div>
          </div>
        </div>
      )}
    </div>
  );
};