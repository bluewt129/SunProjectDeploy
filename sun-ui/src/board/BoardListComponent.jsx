// BoardListComponent.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';  // Pagination 컴포넌트 import

const BoardListComponent = () => {
    const [notices, setNotices] = useState([]);
    const [employeeNames, setEmployeeNames] = useState({});
    const [selectedStatus, setSelectedStatus] = useState('1');
    const [currentPage, setCurrentPage] = useState(1);
    const [boardPerPage] = useState(15); 
    const [pageGroupSize] = useState(5); 
    const navigate = useNavigate();
    const [emp, setEmp] = useState([]);

    useEffect(() => {
        const value = window.sessionStorage.getItem('user');
        if (value) {
            setEmp(JSON.parse(value));
        }
    }, []); 

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = await fetch('http://sun-api:8787/boardList');
                const data = await response.json();

                const sortedData = [
                    ...data.filter(notice => notice.notiStatus === 'I' && notice.notiDelflag === 'N'),
                    ...data.filter(notice => notice.notiStatus !== 'I' && notice.notiDelflag === 'N')
                ];

                setNotices(sortedData);

                const employeeCodes = sortedData.map(notice => notice.empCode);
                const fetchEmployeeNames = async () => {
                    const data = {};
                    for (const code of employeeCodes) {
                        const empResponse = await fetch(`http://sun-api:8787/api/employee/${code}`);
                        if (empResponse.ok) {
                            const empdata = await empResponse.json();
                            data[code] = {
                                empName: empdata.empName,
                                empDept: empdata.deptCode,
                            };
                        }
                    }
                    setEmployeeNames(data);
                };
                fetchEmployeeNames();
            } catch (error) {
                console.error("게시글 불러오기 오류", error);
            }
        };

        fetchBoardData();
    }, [selectedStatus]);

    const handleSelect = (eventKey) => {
        setSelectedStatus(eventKey);
        setCurrentPage(1); 
    };

    const handleNewBoard = () => {
        if (emp.authorities === "[ROLE_A]") {
            navigate("/boardInsert");
        } else {
            alert("관리자만 사용 가능합니다.");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = String(date.getFullYear()).slice(2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const indexOfLastBoard = currentPage * boardPerPage;
    const indexOfFirstBoard = indexOfLastBoard - boardPerPage;
    const currentBoards = notices.slice(indexOfFirstBoard, indexOfLastBoard);

    const totalPages = Math.ceil(notices.length / boardPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getDeptTitle = (empDept) => {
        switch (empDept) {
            case 1:
                return '경영총괄';
            case 11:
                return '경영지원';
            case 21:
                return '연구개발';
            case 31:
                return '고객지원';
            case 41:
                return '운송관리';
            case 51:
                return '품질관리';
            case 61:
                return '자재관리';
            case 71:
                return '생산제조';
            default:
                return '부서명 없음'; 
        }
    };

    return (
        <div className="container" style={{ marginTop: 30 }}>
            <h2>게시판 목록 
                {emp.authorities === "[ROLE_A]" && 
                <button className="btn btn-primary" onClick={handleNewBoard} style={{ position: 'absolute', right: '190px' }}>
                    게시글 쓰기
                </button>
                }
            </h2>
            <div style={{ height: '670px' }}>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBoards.map((notice, index) => (
                        <tr key={index}>
                            <td style={{ width: '60%'}}>
                                {notice.notiStatus === 'I' && <span className="badge badge-danger">중요</span>}
                                <Link to={`/boardDetail/${notice.notiCode}`}>{notice.notiTitle}</Link>
                            </td>
                            <td style={{ width: '20%'}}>{' [' + getDeptTitle(employeeNames[notice.empCode]?.empDept) + ']'}{employeeNames[notice.empCode]?.empName || notice.empCode}</td>
                            <td style={{ width: '20%'}}>{formatDate(notice.notiDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageGroupSize={pageGroupSize}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

export default BoardListComponent;
