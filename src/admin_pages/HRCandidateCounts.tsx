import React, { useEffect, useState } from "react";
import axios from '../helper/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Users as CandidateIcon, 
  UserCheck as UserCheckIcon, 
  BarChart2 as BarChartIcon 
} from 'lucide-react';

// Fallback UI Components in case shadcn/ui components are not available
const FallbackCard: React.FC<{ children: React.ReactNode, title?: string }> = ({ children, title }) => (
  <div className="border rounded-lg shadow-md p-4">
    {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
    {children}
  </div>
);

const FallbackTable: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      {children}
    </table>
  </div>
);

const FallbackScrollArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-h-[500px] overflow-y-auto">
    {children}
  </div>
);

interface HRData {
  hr_id: number;
  hr_name: string;
  candidate_count: number;
  candidate_names: string[];
}

const HRCandidateCounts: React.FC = () => {
  const [hrData, setHrData] = useState<HRData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  const fetchHRData = async () => {
    try {
      const response = await axios.get("/api/get_all_hr_count_with_candidate/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Add error handling for empty or unexpected response
      if (!response.data || !response.data.hr_counts) {
        throw new Error("Invalid response structure");
      }
      setHrData(response.data.hr_counts);
    } catch (err) {
      console.error("Error fetching HR data:", err);
      setError(err instanceof Error ? err.message : "Failed to load HR data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHRData();
  }, []);

  // Prepare data for bar chart
  const chartData = hrData.map(hr => ({
    name: hr.hr_name,
    candidates: hr.candidate_count
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {error}
      </div>
    );
  }

  // Determine which components to use
  const Card = (window as any).shadcnCard || FallbackCard;
  const CardHeader = (window as any).shadcnCardHeader || 'div';
  const CardTitle = (window as any).shadcnCardTitle || 'h3';
  const CardContent = (window as any).shadcnCardContent || 'div';
  const Table = (window as any).shadcnTable || FallbackTable;
  const TableBody = (window as any).shadcnTableBody || 'tbody';
  const TableCell = (window as any).shadcnTableCell || 'td';
  const TableHead = (window as any).shadcnTableHead || 'th';
  const TableHeader = (window as any).shadcnTableHeader || 'thead';
  const TableRow = (window as any).shadcnTableRow || 'tr';
  const ScrollArea = (window as any).shadcnScrollArea || FallbackScrollArea;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
          <BarChartIcon className="mr-4 text-blue-600" size={48} />
          HR Candidate Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CandidateIcon className="mr-2 text-blue-600" />
                Candidate Counts by HR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    cursor={{fill: 'rgba(0, 0, 0, 0.1)'}}
                    contentStyle={{
                      backgroundColor: '#f8f9fa', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="candidates" 
                    fill="#3b82f6" 
                    barSize={40}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheckIcon className="mr-2 text-blue-600" />
                HR Candidate Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">HR Name</TableHead>
                      <TableHead className="text-center">Candidate Count</TableHead>
                      <TableHead>Candidate Names</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hrData.map((hr) => (
                      <TableRow key={hr.hr_id}>
                        <TableCell className="font-medium">{hr.hr_name}</TableCell>
                        <TableCell className="text-center">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                            {hr.candidate_count}
                          </span>
                        </TableCell>
                        <TableCell>
                          <ul className="space-y-1 max-h-[150px] overflow-y-auto text-center">
                            {hr.candidate_names.map((name, index) => (
                              <li 
                                key={index} 
                                className="text-sm text-gray-600 truncate"
                              >
                                {name}
                              </li>
                            ))}
                          </ul>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HRCandidateCounts;