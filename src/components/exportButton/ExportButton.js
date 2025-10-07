// src/components/ExportButton.js
import { useState } from "react";
import { Button } from "react-bootstrap";

const ExportButton = ({ params }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        seed: params.seed,
        page: params.page || 1,
        language: params.language,
        limit: params.limit || 10,
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/export?${queryParams}`
      );

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `songs-export-${params.seed}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export error:", error);
      alert("Export failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="success"
      onClick={handleExport}
      disabled={loading}
      className="w-100"
    >
      {loading ? "⏳ Exporting..." : "📦 Export ZIP"}
    </Button>
  );
};

export default ExportButton;
