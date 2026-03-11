"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/kdl";

interface KDLViewerProps {
  kdl: string;
}

export default function KDLViewer({ kdl }: KDLViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(kdl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-full">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-300">KDL Output</h3>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded bg-blue-600 px-3 py-1 text-xs hover:bg-blue-700"
        >
          {copied ? "✓ Copied!" : "Copy KDL"}
        </button>
      </div>
      <pre className="h-full overflow-auto rounded-lg bg-gray-800 p-4 text-xs text-gray-300">
        <code>{kdl}</code>
      </pre>
    </div>
  );
}
