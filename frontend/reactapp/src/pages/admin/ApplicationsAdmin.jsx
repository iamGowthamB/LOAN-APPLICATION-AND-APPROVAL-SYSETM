// import React, { useContext, useEffect, useState } from 'react';
// import { Button, Card, Form, Modal } from 'react-bootstrap';
// import { AuthContext } from '../../auth/AuthContext';
// import { getApplications, updateApplicationStatus } from '../../api/applicationsApi';
// import DataTable from '../../components/DataTable';
// import StatusBadge from '../../components/StatusBadge';
// import DashboardLayout from '../../components/DashboardLayout';

// export default function ApplicationsAdmin() {
//   const { user } = useContext(AuthContext);
//   const [applications, setApplications] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [action, setAction] = useState('Approved');
//   const [reason, setReason] = useState('');

//   useEffect(() => { fetchAll(); }, []);

//   const fetchAll = () => {
//     getApplications().then(setApplications).catch(console.error);
//   };

//   const openModal = (app, act) => {
//     setSelected(app);
//     setAction(act);
//     setShowModal(true);
//   };

//   const confirm = async () => {
//     try {
//       await updateApplicationStatus(selected.id, action, action === 'Rejected' ? reason : null);
//       alert('Status updated');
//       setShowModal(false);
//       fetchAll();
//     } catch (err) {
//       console.error(err);
//       alert('Update failed');
//     }
//   };

//   return (
//     <DashboardLayout role={user.role}>
//       <h2 className="fw-bold mb-4 text-primary">Manage Applications</h2>
//       <Card className="shadow-sm">
//         <Card.Body>
//           <DataTable
//             columns={[
//               { key: 'id', title: 'ID' },
//               { key: 'applicant', title: 'Applicant' },
//               { key: 'loanType', title: 'Loan Type' },
//               { key: 'loanAmount', title: 'Amount' },
//               { key: 'status', title: 'Status' },
//               { key: 'actions', title: 'Actions' }
//             ]}
//             data={applications}
//             renderRow={(row) => (
//               <tr key={row.id}>
//                 <td>{row.id}</td>
//                 <td>{row.fullName || row.user?.username || row.email}</td>
//                 <td>{row.loanType?.name}</td>
//                 <td>{row.loanAmount}</td>
//                 <td><StatusBadge status={row.status} /></td>
//                 <td>
//                   <Button size="sm" className="me-2" onClick={() => openModal(row, 'Approved')} style={{ background: '#198754', border: 'none' }}>Approve</Button>
//                   <Button size="sm" variant="danger" onClick={() => openModal(row, 'Rejected')}>Reject</Button>
//                 </td>
//               </tr>
//             )}
//           />
//         </Card.Body>
//       </Card>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{action} Application</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Application ID: {selected?.id}</p>
//           {action === 'Rejected' && (
//             <Form.Group>
//               <Form.Label>Rejection Reason</Form.Label>
//               <Form.Control as="textarea" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
//             </Form.Group>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={confirm}>Confirm</Button>
//         </Modal.Footer>
//       </Modal>
//     </DashboardLayout>
//   );
// }

import { getApplicationsPaged, updateApplicationStatus } from '../../api/applicationsApi';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthContext';
// import { getApplications, updateApplicationStatus } from '../../api/applicationsApi';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import DashboardLayout from '../../components/DashboardLayout';



export default function ApplicationsAdmin() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('Approved');
  const [reason, setReason] = useState('');

  useEffect(() => { fetchAll(); }, [page, size, sortBy, sortDir, filter]);

  const fetchAll = () => {
    getApplicationsPaged({ page, size, sortBy, sortDir, status: filter })
      .then(res => {
        setApplications(res.content);
        setTotalPages(res.totalPages);
      })
      .catch(console.error);
  };

  const openModal = (app, act) => {
    setSelected(app);
    setAction(act);
    setShowModal(true);
  };

  const confirm = async () => {
    try {
      await updateApplicationStatus(selected.id, action, action === 'Rejected' ? reason : null);
      alert('Status updated');
      setShowModal(false);
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">Manage Applications</h2>

      {/* 🔹 Filter & Sorting Controls */}
      <div className="d-flex mb-3 gap-2">
        <Form.Select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: '200px' }}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </Form.Select>

        <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: '200px' }}>
          <option value="id">ID</option>
          <option value="fullName">Applicant</option>
          <option value="loanAmount">Amount</option>
          <option value="status">Status</option>
        </Form.Select>

        <Form.Select value={sortDir} onChange={e => setSortDir(e.target.value)} style={{ width: '150px' }}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Form.Select>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <DataTable
            columns={[
              { key: 'id', title: 'ID' },
              { key: 'applicant', title: 'Applicant' },
              { key: 'loanType', title: 'Loan Type' },
              { key: 'loanAmount', title: 'Amount' },
              { key: 'status', title: 'Status' },
              { key: 'actions', title: 'Actions' }
            ]}
            data={applications}
            renderRow={(row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.fullName || row.user?.username || row.email}</td>
                <td>{row.loanType?.name}</td>
                <td>{row.loanAmount}</td>
                <td><StatusBadge status={row.status} /></td>
                <td>
                  <Button size="sm" className="me-2" onClick={() => openModal(row, 'Approved')} style={{ background: '#198754', border: 'none' }}>Approve</Button>
                  <Button size="sm" variant="danger" onClick={() => openModal(row, 'Rejected')}>Reject</Button>
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

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{action} Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Application ID: {selected?.id}</p>
          {action === 'Rejected' && (
            <Form.Group>
              <Form.Label>Rejection Reason</Form.Label>
              <Form.Control as="textarea" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={confirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
}
