import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../css/VacationDocComponent.module.css';
import axios from 'axios';
import OrgChartComponent from '../commodule/OrgChartComponent';
import { useNavigate, useParams } from 'react-router-dom';

const formatLocalDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const createDateFromObject = ({ day, month, year }) => {
    return new Date(year, month - 1, day);
};

const DocumentTempDetailComponent = () => {
    const navigate = useNavigate();
    const { edocCode } = useParams();

    const [sessionEmpCode, setSessionEmpCode] = useState(null);
    const [empInfo, setEmpInfo] = useState({});
    const [empDeptCodeToText, setEmpDeptCodeToText] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [weekdayCount, setWeekdayCount] = useState(null);
    const [dateError, setDateError] = useState('');
    const [selectedApprovers, setSelectedApprovers] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reason, setReason] = useState('');
    const [docTitle, setDocTitle] = useState('');
    const [dayOffLeft, setDayOffLeft] = useState(null);
    const [remainingDays, setRemainingDays] = useState(null);
    const [balanceError, setBalanceError] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [docCode, setDocCode] = useState();
    const [signatureImage, setSignatureImage] = useState({});
    const [docType, setDocType] = useState();
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [storeInfo, setStoreInfo] = useState();
    const [receiptImage, setReceiptImage] = useState();
    const [receiptImageErrorMessage, setReceiptImageErrorMessage] = useState();
    const [receiptImagePreview, setReceiptImagePreview] = useState();

    useEffect(() => {
        const today = new Date();
        setCurrentDate(`${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일`);
    }, []);

    useEffect(() => {
        const sessionStorageInfo = window.sessionStorage.getItem("user");
        if (sessionStorageInfo) {
            try {
                const user = JSON.parse(sessionStorageInfo);
                setSessionEmpCode(user.empcode);
            } catch (error) {
                console.error("Failed to parse session storage item 'user':", error);
            }
        } else {
            console.error("No 'user' item found in session storage");
        }
    }, []);

    useEffect(() => {
        if (sessionEmpCode) {
            employeeInfo(sessionEmpCode);
        }
    }, [sessionEmpCode]);

    useEffect(() => {
        if (startDate && endDate) {
            validateDates(startDate, endDate);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        if (weekdayCount !== null && dayOffLeft !== null) {
            const remaining = dayOffLeft - weekdayCount;
            setRemainingDays(remaining);
            setBalanceError(remaining < 0 ? '잔여 연차가 부족합니다.' : '');
        }
    }, [weekdayCount, dayOffLeft]);

    useEffect(() => {
        if (edocCode) {
            axios.get("http://sun-api:8787/api/edoc/docDetail", { params: { edocCode } })
                .then((res) => {
                    console.log("data: ", res.data);
                    const tempJsonData = JSON.parse(res.data.edocContent);
                    setStartDate(new Date(tempJsonData.startDate));
                    setEndDate(new Date(tempJsonData.endDate));
                    setReason(tempJsonData.reason);
                    setDocTitle(res.data.edocTitle);
                    setDocType(res.data.edocType);
                    setItems(tempJsonData.items);
                    setTotalPrice(tempJsonData.totalPrice);
                    setStoreInfo(tempJsonData.storeInfo);
                    if (res.data.edocType == 'E') {
                        axios.get("http://sun-api:8787/api/edoc/getDocFile", { params: { edocCode } })
                            .then((res) => {
                                setReceiptImage(res.data);
                            }).catch((error) => console.error(error))
                    }
                })
                .catch((error) => console.log(error));

            axios.get("http://sun-api:8787/api/edoc/getEDocAppList", { params: { edocCode } })
                .then((res) => {
                    const approvers = res.data;
                    console.log(approvers);
                    if (sessionEmpCode) {
                        // Add session employee info at the start of the approvers list
                        const sessionApprover = approvers.find(a => a.empCode === sessionEmpCode);
                        const filteredApprovers = approvers.filter(a => a.empCode !== sessionEmpCode);
                        setSelectedApprovers(sessionApprover ? [sessionApprover, ...filteredApprovers] : filteredApprovers);
                    } else {
                        setSelectedApprovers(approvers);
                    }
                })
                .catch((error) => console.log(error));
            setDocCode(edocCode);
        }
    }, [edocCode, sessionEmpCode]);

    const employeeInfo = async (empCode) => {
        try {
            const response = await axios.get("http://sun-api:8787/api/jpa/edoc/employeeInfo", { params: { empCode } });
            const dayOffData = await axios.get("http://sun-api:8787/api/edoc/getDayOff", { params: { empCode } });
            const getEmpSig = await axios.get("http://sun-api:8787/api/edoc/getEmpSignatures?empCodes=" + empCode);
            console.log("dayOff:", dayOffData.data);
            setDayOffLeft(dayOffData.data);
            setEmpInfo(response.data);
            setSignatureImage(getEmpSig.data);
            setEmpDeptCodeToText(deptCodeToText(response.data.deptCode));
        } catch (error) {
            console.error("Error fetching employee info:", error);
        }
    };

    const validateDates = (start, end) => {
        if (new Date(start) > new Date(end)) {
            setDateError('종료일이 시작일보다 이전일 수 없습니다.');
            setWeekdayCount(null);
        } else {
            setDateError('');
            calcDate(start, end);
        }
    };

    const koreanHolidays = useMemo(() => {
        const year = new Date().getFullYear();
        return [
            new Date(year, 0, 1),   // 신정
            new Date(year, 2, 1),   // 삼일절
            new Date(year, 4, 5),   // 어린이날
            new Date(year, 5, 6),   // 현충일
            new Date(year, 7, 15),  // 광복절
            new Date(year, 9, 3),   // 개천절
            new Date(year, 9, 9),   // 한글날
            new Date(year, 11, 25)  // 성탄절
        ];
    }, []);

    const isHoliday = (date) => {
        return koreanHolidays.some(holiday => holiday.getTime() === date.getTime());
    };

    const calcDate = (start, end) => {
        const date1 = new Date(start);
        const date2 = new Date(end);

        let count = 0;
        let tempDate = new Date(date1);

        while (tempDate <= date2) {
            const day = tempDate.getDay();
            if (day !== 0 && day !== 6 && !isHoliday(tempDate)) {
                count++;
            }
            tempDate.setDate(tempDate.getDate() + 1);
        }

        setWeekdayCount(count);
    };

    const deptCodeToText = (deptCode) => {
        const deptNames = {
            1: '경영총괄',
            11: '경영지원',
            21: '연구개발',
            31: '고객지원',
            41: '운송관리',
            51: '품질관리',
            61: '자재관리',
            71: '생산제조'
        };
        return deptNames[deptCode] || '부서 없음';
    };

    const handleApproverSelection = (approvers) => {
        const sortedApprovers = approvers.sort((a, b) => {
            if (a.empCode == sessionEmpCode) return -1;
            if (b.empCode == sessionEmpCode) return 1;
            return 0;
        });
        setSelectedApprovers(sortedApprovers);
    };

    const handleSubmit = () => {
        if (!startDate || !endDate || !reason || !docTitle || !selectedApprovers.length || !weekdayCount || balanceError) {
            alert("필수값을 모두 입력해 주세요");
            return;
        }

        const date = new Date();
        const serverSendDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        const data = {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            reason,
            weekdayCount,
            docTitle,
            docStatus: "A",
            docCode: edocCode,
            uploadDate: serverSendDate,
            empCode: sessionEmpCode,
            approvers: selectedApprovers.map(approver => approver.empCode)
        };

        console.log("Submitting data:", data); // 데이터 확인

        axios.post("http://sun-api:8787/api/edoc/docUpdate", data)
            .then((response) => {
                console.log("Response:", response); // 서버 응답 확인
                navigate('/documentList');
            })
            .catch((error) => {
                console.log("Error:", error); // 오류 확인
            });
    };

    const handleReceiptFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setReceiptImage(selectedFile);
            setReceiptImageErrorMessage('');
            const reader = new FileReader();
            reader.onloadend = () => {
                setReceiptImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setReceiptImage(null);
            setReceiptImagePreview('');
            setReceiptImageErrorMessage('이미지 파일만 업로드 해주세요 (jpg, png)');
        }
    };

    const handleReceiptUpload = async () => {
        if (!receiptImage) {
            alert('파일이 없습니다');
            return;
        }
        const formData = new FormData();
        formData.append('receipt', receiptImage);
        try {
            await axios.post('http://sun-api:8787/api/clova/setReceipt', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                console.log(res.data.images[0].receipt.result);
                const result = res.data.images[0].receipt.result;
                setStoreInfo(result.storeInfo.name.text);

                setStartDate(formatLocalDate(createDateFromObject(result.paymentInfo.date.formatted))); // Date 객체로 설정

                console.log(formatLocalDate(createDateFromObject(result.paymentInfo.date.formatted)));
                setTotalPrice(result.totalPrice.price.text);
                if (result.subResults[0] != null) {
                    setItems(result.subResults[0].items);
                }
                setReceiptImageErrorMessage('');
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            setReceiptImageErrorMessage('등록에 실패하였습니다');
        }
    };

    const getDayClassName = (date) => {
        const day = date.getDay();
        if (day === 0 || day === 6 || isHoliday(date)) {
            return styles.redDay;
        }
        return '';
    };

    const toggleEditMode = () => {
        setIsEditMode(prevMode => !prevMode);
    };

    return (
        <div className={styles.vacationDocContainer}>

            {isEditMode && (
                <OrgChartComponent
                    mappingUrl="empList"
                    buttonName="결재자"
                    maxSelection="3"
                    onSelectionChange={handleApproverSelection}
                    disabled={!isEditMode}
                />
            )}
            {
                docType == 'V' && (
                    <>
                        <h1 className={styles.vacationDocHeader}>휴가 신청서</h1>
                        <form>
                            <table className={styles.vacationDocTable} style={{ width: '40%', marginLeft: 'auto', marginBottom: '10px', textAlign: 'center' }}>
                                <thead>
                                    <tr>
                                        {selectedApprovers.map((approver) => (
                                            <th key={approver.empCode} style={{ fontSize: '12px', padding: '5px' }}>
                                                {approver.empName} {approver.jobName}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {selectedApprovers.map((approver) => (
                                            <td key={approver.empCode} style={{ textAlign: 'center', padding: '5px' }}>
                                                {approver.empCode == sessionEmpCode ? (
                                                    <img
                                                        src={signatureImage[approver.empCode] || "https://data1.pokemonkorea.co.kr/newdata/pokedex/full/005401.png"}
                                                        alt='싸인'
                                                        style={{
                                                            width: '80px',
                                                            height: 'auto',
                                                            objectFit: 'contain',
                                                            minHeight: '50px',
                                                            maxHeight: '50px'
                                                        }}
                                                    />
                                                ) : (
                                                    <div style={{ width: '80px', height: '50px' }} />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>

                            <table className={styles.vacationDocTable}>
                                <tbody>
                                    <tr>
                                        <th>문서 제목</th>
                                        <td>
                                            {isEditMode ? (
                                                <input type='text' value={docTitle} onChange={(e) => setDocTitle(e.target.value)} />
                                            ) : (
                                                <span>{docTitle}</span>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>잔여 연차</th>
                                        <td>{dayOffLeft}</td>
                                    </tr>
                                    <tr>
                                        <th>기간</th>
                                        <td colSpan="3">
                                            {isEditMode ? (
                                                <div className={styles.dateRangeContainer}>
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        dateFormat="yyyy-MM-dd"
                                                        className={styles.dateInput}
                                                        placeholderText="시작일"
                                                        dayClassName={getDayClassName}
                                                    />
                                                    <span className={styles.dateSeparator}>~</span>
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        dateFormat="yyyy-MM-dd"
                                                        className={styles.dateInput}
                                                        placeholderText="종료일"
                                                        dayClassName={getDayClassName}
                                                    />
                                                </div>
                                            ) : (
                                                <span>{startDate ? startDate.toLocaleDateString() : ''} ~ {endDate ? endDate.toLocaleDateString() : ''}</span>
                                            )}
                                            {dateError && <p className={styles.dateError}>{dateError}</p>}
                                            {weekdayCount !== null && !dateError && <p>사용일수: {weekdayCount}일</p>}
                                            {remainingDays !== null && (
                                                <p className={remainingDays < 0 ? styles.balanceError : ''}>
                                                    잔여 연차: {remainingDays}일
                                                </p>
                                            )}
                                            {balanceError && <p className={styles.balanceError}>{balanceError}</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>사유</th>
                                        <td colSpan="3">
                                            {isEditMode ? (
                                                <input type='text' value={reason} onChange={(e) => setReason(e.target.value)} />
                                            ) : (
                                                <span>{reason}</span>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>

                        <div className={styles.vacationDocSignatureSection}>
                            <p className={styles.vacationDocSignature}>위와 같이 휴가를 신청하오니 허락하여 주시기 바랍니다.</p>

                            <div className={styles.vacationDocDate}>
                                <p className={styles.signature}>{currentDate}</p>
                            </div>

                            <p className={styles.vacationDocSignature}>부서: {empDeptCodeToText}</p>
                            <p className={styles.vacationDocSignature}>성명: {empInfo.empName}</p>
                            <h1 className={styles.companyName}>주식회사 썬 컴퍼니&nbsp;&nbsp;&nbsp;직인</h1>
                        </div>
                    </>
                )
            }
            {
                docType == 'E' && (
                    <>
                        <h1 className={styles.vacationDocHeader}>지출결의서</h1>
                        <form>
                            <table className={styles.vacationDocTable} style={{ width: '40%', marginLeft: 'auto', marginBottom: '10px', textAlign: 'center' }}>
                                <thead>
                                    <tr>
                                        {selectedApprovers.map((approver) => (
                                            <th key={approver.empCode} style={{ fontSize: '12px', padding: '5px' }}>
                                                {approver.empName} {approver.jobName}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {selectedApprovers.map((approver) => (
                                            <td key={approver.empCode} style={{ textAlign: 'center', padding: '5px' }}>
                                                {approver.edclStatus === 'S' ? (
                                                    <img
                                                        src={signatureImage[approver.empCode] || "https://data1.pokemonkorea.co.kr/newdata/pokedex/full/005401.png"}
                                                        alt='싸인'
                                                        style={{
                                                            width: '80px',
                                                            height: 'auto',
                                                            objectFit: 'contain',
                                                            minHeight: '50px',
                                                            maxHeight: '50px'
                                                        }}
                                                    />
                                                ) : (
                                                    <div style={{ width: '80px', height: '50px' }} />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>

                            <table className={styles.vacationDocTable}>
                                <tbody>
                                    <tr>
                                        <th>문서 제목</th>
                                        <td>
                                            {isEditMode ? (
                                                <input type='text' value={docTitle} onChange={(e) => setDocTitle(e.target.value)} />
                                            ) : (
                                                <span>{docTitle}</span>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>사용처</th>
                                        <td>
                                            <span>{storeInfo}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>결제 금액</th>
                                        <td>
                                            <span>{totalPrice}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>세부 결제 내역</th>
                                        <td>
                                            <table>
                                                <tbody>
                                                    {items.map((item, index) => (
                                                        <tr key={index}>
                                                            <td><span>{item.name}</span></td>
                                                            <td><span>{item.price}원</span></td>
                                                            <td><span>{item.count}개</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>사유</th>
                                        <td colSpan="3">
                                            <span>{reason}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>영수증</th>

                                        {
                                            isEditMode ? (
                                                <>
                                                    <td>
                                                        <input type='file' accept="image/jpg, image/png" onChange={handleReceiptFileChange} />
                                                        <button type='button' className="btn btn-primary" onClick={handleReceiptUpload}>등록</button>
                                                        {receiptImageErrorMessage && <p style={{ color: 'red' }}>{receiptImageErrorMessage}</p>}
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>
                                                        <img src={receiptImage} />
                                                    </td>
                                                </>
                                            )
                                        }
                                    </tr>
                                    {receiptImagePreview && (
                                        <tr>
                                            <td colSpan="2">
                                                <div>
                                                    <h5>영수증</h5>
                                                    <img
                                                        src={receiptImagePreview}
                                                        alt="receipt Preview"
                                                        style={{ maxWidth: '50%', height: 'auto' }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </form>
                        <div className={styles.vacationDocSignatureSection}>
                            <p className={styles.vacationDocSignature}>위와 같이 지출을 신청하오니 허락하여 주시기 바랍니다.</p>

                            <div className={styles.vacationDocDate}>
                                <p className={styles.signature}>{currentDate}</p>
                            </div>

                            <p className={styles.vacationDocSignature}>부서: {empDeptCodeToText}</p>
                            <p className={styles.vacationDocSignature}>성명: {empInfo.empName}</p>
                            <h1 className={styles.companyName}>주식회사 썬 컴퍼니&nbsp;&nbsp;&nbsp;직인</h1>
                        </div>
                    </>
                )
            }


            <div
                className={styles.buttonContainer}
                style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
            >
                {isEditMode ? (
                    <>
                        <input
                            type='button'
                            value="기안"
                            onClick={handleSubmit}
                            className={styles.vacationDocSubmitButton}
                            style={{ marginLeft: '10px', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} // 버튼에 대한 인라인 스타일 추가
                        />
                    </>
                ) : (
                    <input
                        type='button'
                        value="수정"
                        onClick={toggleEditMode}
                        className={styles.vacationDocSubmitButton}
                        style={{ marginLeft: '10px', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} // 버튼에 대한 인라인 스타일 추가
                    />
                )}
            </div>

        </div>
    );
};

export default DocumentTempDetailComponent;