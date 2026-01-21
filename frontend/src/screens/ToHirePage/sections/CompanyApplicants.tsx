import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";

interface Application {
  id: number;
  listing_id: number;
  worker_id: number;
  status: "pending" | "accepted" | "rejected";
  applied_at: string;
  approved_at?: string;
  rejected_at?: string;
}

export const CompanyApplicants = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState("");
  const [panelVisible, setPanelVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<"accepted" | "rejected">(
    "accepted",
  );
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     CLOCK
  ========================= */
  useEffect(() => {
    const tick = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  /* =========================
     FETCH APPLICATIONS
  ========================= */
  useEffect(() => {
    fetch("http://localhost:5000/api/company/applicants", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error(err));
  }, []);

  /* =========================
     APPROVE / REJECT
  ========================= */
  const updateStatus = async (
    applicationId: number,
    status: "accepted" | "rejected",
  ) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/company/applications/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        },
      );

      if (!res.ok) throw new Error("Failed");

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? {
                ...app,
                status,
                approved_at:
                  status === "accepted"
                    ? new Date().toISOString()
                    : app.approved_at,
                rejected_at:
                  status === "rejected"
                    ? new Date().toISOString()
                    : app.rejected_at,
              }
            : app,
        ),
      );
    } catch {
      alert("Failed to update application");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FILTERS
  ========================= */
  const pending = applications.filter((a) => a.status === "pending");
  const accepted = applications.filter((a) => a.status === "accepted");
  const rejected = applications.filter((a) => a.status === "rejected");
  const history = selectedStatus === "accepted" ? accepted : rejected;

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <span className="bg-white px-4 py-2 rounded-lg shadow border">
            {currentTime}
          </span>
        </div>

        <div>
          <div className="flex justify-between mb-4">
            <h1 className="bg-[#FF9D00] px-6 py-2 rounded-full">
              Job Applications
            </h1>
            <button
              onClick={() => setPanelVisible(true)}
              className="bg-white px-6 py-2 rounded-full shadow"
            >
              Approval History
            </button>
          </div>

          <Card>
            <CardContent className="p-6 space-y-3">
              {pending.map((app) => (
                <div
                  key={app.id}
                  className="border p-4 rounded-xl flex justify-between"
                >
                  <div>
                    <p className="font-bold">Application #{app.id}</p>
                    <p>Worker ID: {app.worker_id}</p>
                    <p>Listing ID: {app.listing_id}</p>
                    <p className="text-xs text-gray-500">
                      Applied: {app.applied_at}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      disabled={loading}
                      onClick={() => updateStatus(app.id, "accepted")}
                      className="bg-green-600 text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      disabled={loading}
                      onClick={() => updateStatus(app.id, "rejected")}
                      className="bg-red-500 text-white"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}

              {pending.length === 0 && (
                <div className="text-center text-gray-500">
                  No pending applications
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* APPROVAL HISTORY */}
      {panelVisible && (
        <div
          className="fixed inset-0 bg-black/30 flex justify-center items-center"
          onClick={() => setPanelVisible(false)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#FF9D00] p-6 flex justify-between">
              <h3>Approval History</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedStatus("accepted")}
                  className={`px-4 py-2 rounded ${
                    selectedStatus === "accepted"
                      ? "bg-green-500 text-white"
                      : "bg-white"
                  }`}
                >
                  Accepted ({accepted.length})
                </button>
                <button
                  onClick={() => setSelectedStatus("rejected")}
                  className={`px-4 py-2 rounded ${
                    selectedStatus === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-white"
                  }`}
                >
                  Rejected ({rejected.length})
                </button>
              </div>
            </div>

            <CardContent className="p-6">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Worker</th>
                    <th>Listing</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((app) => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>{app.worker_id}</td>
                      <td>{app.listing_id}</td>
                      <td>
                        {selectedStatus === "accepted"
                          ? app.approved_at
                          : app.rejected_at}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>

            <div className="p-4">
              <Button
                onClick={() => setPanelVisible(false)}
                className="w-full bg-[#FF9D00] text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
