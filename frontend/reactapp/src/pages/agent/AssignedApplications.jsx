// import React, { useContext, useEffect, useState } from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
// import { AuthContext } from '../../auth/AuthContext';
// import { getAssignedApplicationsPaged } from '../../api/applicationsApi';
// import DataTable from '../../components/DataTable';
// import DashboardLayout from '../../components/DashboardLayout';

// export default function AssignedApplications() {
//   const { user } = useContext(AuthContext);
//   const [apps, setApps] = useState([]);
//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(5);
//   const [totalPages, setTotalPages] = useState(0);
//   const [sortBy, setSortBy] = useState('id');
//   const [sortDir, setSortDir] = useState('asc');
//   const [statusFilter, setStatusFilter] = useState('');

//   useEffect(() => {
//     fetchAssignedApps();
//   }, [page, size, sortBy, sortDir, statusFilter]);

//   const fetchAssignedApps = async () => {
//     try {
//       const res = await getAssignedApplicationsPaged(page, size, sortBy, sortDir, statusFilter);
//       setApps(res.content || []);
//       setTotalPages(res.totalPages || 0);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to fetch applications');
//     }
//   };

//   return (
//     <DashboardLayout role={user.role}>
//       <h2 className="fw-bold mb-4 text-primary">Assigned Applications</h2>

//       {/* 🔹 Filters & Sorting Controls */}
//       <div className="d-flex mb-3 gap-2 flex-wrap">
//         <Form.Select
//           value={statusFilter}
//           onChange={e => setStatusFilter(e.target.value)}
//           style={{ width: '200px' }}
//         >
//           <option value="">All Status</option>
//           <option value="Pending">Pending</option>
//           <option value="Approved">Approved</option>
//           <option value="Rejected">Rejected</option>
//         </Form.Select>

//         <Form.Select
//           value={sortBy}
//           onChange={e => setSortBy(e.target.value)}
//           style={{ width: '200px' }}
//         >
//           <option value="id">ID</option>
//           <option value="fullName">Applicant</option>
//           <option value="loanAmount">Amount</option>
//           <option value="status">Status</option>
//         </Form.Select>

//         <Form.Select
//           value={sortDir}
//           onChange={e => setSortDir(e.target.value)}
//           style={{ width: '150px' }}
//         >
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </Form.Select>
//       </div>

//       <Card className="shadow-sm">
//         <Card.Body>
//           <DataTable
//             columns={[
//               { key: 'id', title: 'ID' },
//               { key: 'fullName', title: 'Applicant' },
//               { key: 'loanAmount', title: 'Amount' },
//               { key: 'status', title: 'Status' },
//               { key: 'actions', title: 'Actions' }
//             ]}
//             data={apps}
//             renderRow={(row) => (
//               <tr key={row.id}>
//                 <td>{row.id}</td>
//                 <td>{row.fullName}</td>
//                 <td>{row.loanAmount}</td>
//                 <td>{row.status}</td>
//                 <td>
//                   <Button
//                     size="sm"
//                     style={{ background: '#0d6efd', border: 'none' }}
//                     onClick={() => window.location.href = `/agent/applications/${row.id}`}
//                   >
//                     Review
//                   </Button>
//                 </td>
//               </tr>
//             )}
//           />
//         </Card.Body>
//       </Card>

//       {/* 🔹 Pagination Controls */}
//       <div className="d-flex justify-content-between align-items-center mt-3">
//         <Button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</Button>
//         <span>Page {page + 1} of {totalPages}</span>
//         <Button disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
//       </div>
//     </DashboardLayout>
//   );
// }

import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthContext';
import { getAssignedApplicationsPaged } from '../../api/applicationsApi';
import DataTable from '../../components/DataTable';
import DashboardLayout from '../../components/DashboardLayout';
import StatusBadge from '../../components/StatusBadge'; // 🔹 import this

export default function AssignedApplications() {
  const { user } = useContext(AuthContext);
  const [apps, setApps] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchAssignedApps();
  }, [page, size, sortBy, sortDir, statusFilter]);

  const fetchAssignedApps = async () => {
    try {
      const res = await getAssignedApplicationsPaged(page, size, sortBy, sortDir, statusFilter);
      setApps(res.content || []);
      setTotalPages(res.totalPages || 0);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch applications');
    }
  };

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">Assigned Applications</h2>

      {/* 🔹 Filters & Sorting Controls */}
      <div className="d-flex mb-3 gap-2 flex-wrap">
        <Form.Select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </Form.Select>

        <Form.Select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="id">ID</option>
          <option value="fullName">Applicant</option>
          <option value="loanAmount">Amount</option>
          <option value="status">Status</option>
        </Form.Select>

        <Form.Select
          value={sortDir}
          onChange={e => setSortDir(e.target.value)}
          style={{ width: '150px' }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Form.Select>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <DataTable
            columns={[
              { key: 'id', title: 'ID' },
              { key: 'fullName', title: 'Applicant' },
              { key: 'loanAmount', title: 'Amount' },
              { key: 'status', title: 'Status' },
              { key: 'actions', title: 'Actions' }
            ]}
            data={apps}
            renderRow={(row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.fullName}</td>
                <td>{row.loanAmount}</td>
                {/* 🔹 Use StatusBadge instead of plain text */}
                <td><StatusBadge status={row.status} /></td>
                <td>
                  <Button
                    size="sm"
                    style={{ background: '#0d6efd', border: 'none' }}
                    onClick={() => window.location.href = `/agent/applications/${row.id}`}
                  >
                    Review
                  </Button>
                </td>
              </tr>
            )}
          />
        </Card.Body>
      </Card>

      {/* 🔹 Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</Button>
        <span>Page {page + 1} of {totalPages}</span>
        <Button disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
      </div>
    </DashboardLayout>
  );
}
