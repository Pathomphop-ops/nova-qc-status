// qc-scanner-app/src/app/checklist/[name_cus]/[element_no]/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import QC1Form from '@/components/Checklists/QC1Form';
import QC2Form from '@/components/Checklists/QC2Form';
import LogisticForm from '@/components/Checklists/LogisticForm';
import Swal from 'sweetalert2'; // Assuming SweetAlert2 is installed or will be.

interface ChecklistData {
  qc1: any; // Define a more specific interface later
  qc2: any;
  logistic: any;
}

export default function ChecklistPage() {
  const params = useParams();
  const name_cus = Array.isArray(params.name_cus) ? params.name_cus[0] : params.name_cus;
  const element_no = Array.isArray(params.element_no) ? params.element_no[0] : params.element_no;

  const [checklistData, setChecklistData] = useState<ChecklistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'qc1' | 'qc2' | 'logistic'>('qc1');
  const [projectId, setProjectId] = useState<string | null>(null);
  const [elementType, setElementType] = useState<'pillar' | 'beam' | 'general'>('general');
  const [elementExists, setElementExists] = useState<boolean>(true); // New state for element existence
  const [elementTypeAll, setElementTypeAll] = useState<string | null>(null);


  const fetchChecklistInitialData = useCallback(async () => {
    if (!name_cus || !element_no) {
      setError('Missing name_cus or element_no');
      setLoading(false);
      return;
    }

    // Determine element type from element_no
    if (element_no.startsWith('C')) {
      setElementType('pillar');
    } else if (element_no.startsWith('B')) {
      setElementType('beam');
    } else {
      setElementType('general');
    }

    const fetchProjectId = async () => {
      try {
        const response = await fetch(`/api/project/${encodeURIComponent(name_cus)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && data.id_project) {
          setProjectId(data.id_project);
          return data.id_project;
        } else {
          throw new Error(data.message || 'Failed to get project ID');
        }
      } catch (err: any) {
        setError(`Error fetching project ID: ${err.message}`);
        setLoading(false);
        return null;
      }
    };

    const checkElementExistence = async (pId: string) => {
        try {
            const response = await fetch(`/api/element?element_no=${encodeURIComponent(element_no)}&project_id=${encodeURIComponent(pId)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success && data.exists) {
                setElementExists(true);
                return true;
            } else {
                setElementExists(false);
                setError(data.message || 'Workpiece element not found for this project.');
                setLoading(false);
                return false;
            }
        } catch (err: any) {
            setError(`Error checking element existence: ${err.message}`);
            setLoading(false);
            return false;
        }
    };

    const fetchChecklistContent = async (pId: string) => {
      try {
        const response = await fetch(`/api/checklist?element_no=${encodeURIComponent(element_no)}&project_id=${encodeURIComponent(pId)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setChecklistData(data.data);
        } else {
          setError(data.message || 'Failed to fetch checklist data.');
        }
      } catch (err: any) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    const pId = await fetchProjectId();
    if(pId) {
        const exists = await checkElementExistence(pId);
        if(exists) {
            fetchChecklistContent(pId);
        }
    }

  }, [name_cus, element_no]);

  useEffect(() => {
    fetchChecklistInitialData();
  }, [fetchChecklistInitialData]);

  const handleSave = async (checklistType: string, formData: any) => {
    if (!projectId || !element_no) {
      Swal.fire('Error', 'Project ID or Element No is missing.', 'error');
      return;
    }

    try {
      const response = await fetch(`/api/checklist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checklist_type: checklistType,
          payload: { ...formData, element_no, id_project: projectId },
        }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire('Success', data.message, 'success');
        // Re-fetch data to update gating status
        fetchChecklistInitialData();
      } else {
        Swal.fire('Error', data.message || 'Failed to save checklist.', 'error');
      }
    } catch (err: any) {
      Swal.fire('Error', `An error occurred: ${err.message}`, 'error');
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading checklist...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center text-red-600">Error: {error}</div>;
  }
  
  if (!elementExists) {
    return <div className="flex min-h-screen items-center justify-center text-red-600 text-center">Error: {error || "Workpiece element not found or is invalid."}</div>;
  }

  // Gating logic
  const qc1Passed = checklistData?.qc1?.qc1_result_first_check === 'Y';
  const qc2Passed = checklistData?.qc2?.qc2_result_first_check === 'Y';

  if(element_no && projectId){
    const response_part_type = async () => {
      const ress_response_part_type = await fetch(`https://datacenterpkt.novamodular.co.th/api/v2/find_part_type_all.php?element_no=${encodeURIComponent(element_no)}&project_id=${encodeURIComponent(projectId)}`);
      const ress_response_part_type_json = await ress_response_part_type.json();
      if(ress_response_part_type_json.success && ress_response_part_type_json.data[0] && ress_response_part_type_json.data[0].part_type){
        // console.log(ress_response_part_type_json.data[0].part_type);
        setElementTypeAll(ress_response_part_type_json.data[0].part_type);
      }
    }
    response_part_type();
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">QC Checklist</h1>
          <p className="text-md text-gray-500 mt-1">for Workpiece</p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4 border-b border-gray-200 pb-3">Inspection Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Project</span>
                    <span className="text-lg text-gray-800 font-semibold">{name_cus ? decodeURIComponent(name_cus) : "N/A"}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Element No.</span>
                    {/* <span className="text-lg text-gray-800 font-semibold">{element_no ? decodeURIComponent(element_no) : "N/A"}</span> */}
                    <span className="text-lg text-gray-800 font-semibold">
                    {element_no 
                      ? decodeURIComponent(
                          element_no + (elementTypeAll ? ` (${elementTypeAll})` : '')
                        ) 
                      : "N/A"}
                  </span>
                </div>
                
            </div>
        </div>

        {/* Tabs and Forms Card */}
        {projectId && element_no && (
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6">
              {/* Responsive Tabs */}
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">Select a tab</label>
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => {
                    const value = e.target.value as 'qc1' | 'qc2' | 'logistic';
                    if (value === 'qc2' && !qc1Passed) return;
                    if (value === 'logistic' && !qc2Passed) return;
                    setActiveTab(value);
                  }}
                  value={activeTab}
                >
                  <option value="qc1">QC 1</option>
                  <option value="qc2" disabled={!qc1Passed}>QC 2</option>
                  <option value="logistic" disabled={!qc2Passed}>Logistic</option>
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                      onClick={() => setActiveTab('qc1')}
                      className={`
                        ${activeTab === 'qc1' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        whitespace-nowrap py-4 px-3 border-b-2 font-medium text-base transition-colors duration-200
                      `}
                    >
                      QC 1
                    </button>
                    <button
                      onClick={() => qc1Passed && setActiveTab('qc2')}
                      className={`
                        ${activeTab === 'qc2' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}
                        ${!qc1Passed ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-700 hover:border-gray-300'}
                        whitespace-nowrap py-4 px-3 border-b-2 font-medium text-base transition-colors duration-200
                      `}
                      disabled={!qc1Passed}
                    >
                      QC 2
                    </button>
                    <button
                      onClick={() => qc2Passed && setActiveTab('logistic')}
                      className={`
                        ${activeTab === 'logistic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}
                        ${!qc2Passed ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-700 hover:border-gray-300'}
                        whitespace-nowrap py-4 px-3 border-b-2 font-medium text-base transition-colors duration-200
                      `}
                      disabled={!qc2Passed}
                    >
                      Logistic
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'qc1' && <QC1Form initialData={checklistData?.qc1} elementNo={element_no} projectId={projectId} elementType={elementType} onSave={handleSave} />}
              {activeTab === 'qc2' && <QC2Form initialData={checklistData?.qc2} elementNo={element_no} projectId={projectId} elementType={elementType} onSave={handleSave} />}
              {activeTab === 'logistic' && <LogisticForm initialData={checklistData?.logistic} elementNo={element_no} projectId={projectId} elementType={elementType} onSave={handleSave} />}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}