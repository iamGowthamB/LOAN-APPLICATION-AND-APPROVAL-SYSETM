// import React, { useContext, useEffect, useState } from 'react';
// import { Card, Button, Form, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../auth/AuthContext';
// import { getMyApplicationsPaged } from '../../api/applicationsApi';
// import DataTable from '../../components/DataTable';
// import StatusBadge from '../../components/StatusBadge';
// import DashboardLayout from '../../components/DashboardLayout';

// export default function MyApplications() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [applications, setApplications] = useState([]);
//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(5);
//   const [totalPages, setTotalPages] = useState(0);
//   const [sortBy, setSortBy] = useState('id');
//   const [sortDir, setSortDir] = useState('asc');
//   const [statusFilter, setStatusFilter] = useState('');

//   const fetchApplications = async () => {
//     try {
//       const res = await getMyApplicationsPaged(page, size, sortBy, sortDir, statusFilter);
//       setApplications(res.content || []);
//       setTotalPages(res.totalPages);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to fetch applications');
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, [user, page, size, sortBy, sortDir, statusFilter]);

//   const columns = [
//     { key: 'id', title: 'ID' },
//     { key: 'loanType', title: 'Loan Type' },
//     { key: 'loanAmount', title: 'Amount' },
//     { key: 'status', title: 'Status' },
//     { key: 'applicationDate', title: 'Applied On' },
//     { key: 'actions', title: 'Actions' }
//   ];

//   return (
//     <DashboardLayout role={user.role}>
//       <h2 className="fw-bold mb-4 text-primary">My Applications</h2>

//       {/* Filters & Sorting in a single row */}
//       <Card className="shadow-sm mb-3 p-3">
//         <Row className="g-3 align-items-end">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Status</Form.Label>
//               <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
//                 <option value="">All Status</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Rejected">Rejected</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Sort By</Form.Label>
//               <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
//                 <option value="id">ID</option>
//                 <option value="loanType">Loan Type</option>
//                 <option value="loanAmount">Amount</option>
//                 <option value="status">Status</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Sort Order</Form.Label>
//               <Form.Select value={sortDir} onChange={e => setSortDir(e.target.value)}>
//                 <option value="asc">Ascending</option>
//                 <option value="desc">Descending</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>
//       </Card>

//       {/* Applications Table */}
//       <Card className="shadow-sm">
//         <Card.Body>
//           <DataTable
//             columns={columns}
//             data={applications}
//             renderRow={row => (
//               <tr key={row.id}>
//                 <td>{row.id}</td>
//                 <td>{row.loanType?.name || row.loanType}</td>
//                 <td>{row.loanAmount}</td>
//                 <td><StatusBadge status={row.status} /></td>
//                 <td>{row.applicationDate ? new Date(row.applicationDate).toLocaleString() : (row.createdAt ? new Date(row.createdAt).toLocaleString() : '')}</td>
//                 <td>
//                   <Button size="sm" onClick={() => navigate(`/applicant/applications/${row.id}`)}>View</Button>
//                 </td>
//               </tr>
//             )}
//           />
//         </Card.Body>
//       </Card>

//       {/* Pagination */}
//       <div className="d-flex justify-content-between align-items-center mt-3">
//         <Button variant="secondary" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</Button>
//         <span>Page {page + 1} of {totalPages}</span>
//         <Button variant="secondary" disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
//       </div>
//     </DashboardLayout>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { getMyApplicationsPaged } from '../../api/applicationsApi';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import DashboardLayout from '../../components/DashboardLayout';

export default function MyApplications() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchApplications = async () => {
    try {
      const res = await getMyApplicationsPaged(page, size, sortBy, sortDir, statusFilter);
      setApplications(res.content || []);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch applications');
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user, page, size, sortBy, sortDir, statusFilter]);

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'loanType', title: 'Loan Type' },
    { key: 'loanAmount', title: 'Amount' },
    { key: 'status', title: 'Status' },
    { key: 'applicationDate', title: 'Applied On' },
    { key: 'actions', title: 'Actions' }
  ];

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">My Applications</h2>

      {/* 🔹 Filters & Sorting Controls */}
      <div className="d-flex mb-3 gap-2">
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
          <option value="loanType">Loan Type</option>
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

      {/* 🔹 Applications Table */}
      <Card className="shadow-sm">
        <Card.Body>
          <DataTable
            columns={columns}
            data={applications}
            renderRow={row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.loanType?.name || row.loanType}</td>
                <td>{row.loanAmount}</td>
                <td><StatusBadge status={row.status} /></td>
                <td>
                  {row.applicationDate
                    ? new Date(row.applicationDate).toLocaleString()
                    : row.createdAt
                      ? new Date(row.createdAt).toLocaleString()
                      : ''}
                </td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/applicant/applications/${row.id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            )}
          />
        </Card.Body>
      </Card>

      {/* 🔹 Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button variant="secondary" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</Button>
        <span>Page {page + 1} of {totalPages}</span>
        <Button variant="secondary" disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
      </div>
    </DashboardLayout>
  );
}
