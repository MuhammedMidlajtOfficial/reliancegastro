import React, { useEffect, useState } from 'react';
import { Card, Statistic, Table, List, Avatar, Tag, DatePicker, Spin } from 'antd';
import { UserOutlined, CalendarOutlined, BoldOutlined } from '@ant-design/icons';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FiCalendar } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboards = () => {
  const [loading, setLoading] = useState(true);
  const [recentPatients, setRecentPatients] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 5,
  });
  
  const [setSelectedDate] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  
  const [patientsCount, setPatientsCount] = useState('');
  const [newsCount, setNewsCount] = useState('');
  const [blogsCount, setBlogsCount] = useState('');
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [othersCount, setOthersCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [genderDataArray, setGenderDataArray] = useState([0,0,0,0]);

  
  const navigate = useNavigate();
  
  const onChange = (date, dateString) => {
    setSelectedDate(dateString);
  };


  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const data = {
    labels: months,
    datasets: [
      {
        label: '2022',
        data: [65, 75, 60, 65, 55, 70, 65, 70, 65, 70, 80, 65],
        backgroundColor: 'rgb(0, 128, 0)',
        borderRadius: {
          topLeft: 2,
          topRight: 2,
        },
      },
      {
        label: '2023',
        data: [55, 65, 50, 55, 45, 60, 55, 60, 55, 60, 70, 55],
        backgroundColor: 'rgb(50, 205, 50)',
        borderRadius: {
          topLeft: 2,
          topRight: 2,
        }
      },
      {
        label: '2024',
        data: [45, 55, 40, 45, 35, 50, 45, 50, 45, 50, 60, 45],
        backgroundColor: 'rgb(144, 238, 144)',
        borderRadius: {
          topLeft: 8,
          topRight: 8,
        }
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: 'top',
        align: 'end',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  const appointmentRequests = [
    { name: 'Devon Lane', time: '09 Dec 3:50 PM', status: 'Declined', avatar: 'path_to_devon_avatar.jpg' },
    { name: 'Marvin', time: '09 Dec 3:50 PM', status: 'Confirmed', avatar: 'path_to_marvin_avatar.jpg' },
    { name: 'Floyd Miles', time: '09 Dec 3:50 PM', status: 'Confirmed', avatar: 'path_to_floyd_avatar.jpg' },
    { name: 'Kristin', time: '09 Dec 3:50 PM', status: 'Declined', avatar: 'path_to_kristin_avatar.jpg' },
    { name: 'Eleanor', time: '09 Dec 3:50 PM', status: 'Confirmed', avatar: 'path_to_eleanor_avatar.jpg' },
    { name: 'Marvin', time: '09 Dec 3:50 PM', status: 'Confirmed', avatar: 'path_to_marvin_avatar.jpg' },
    { name: 'Esther', time: '09 Dec 3:50 PM', status: 'Declined', avatar: 'path_to_esther_avatar.jpg' },
    { name: 'Floyd Miles', time: '09 Dec 3:50 PM', status: 'Confirmed', avatar: 'path_to_floyd_avatar.jpg' },
  ];


  const patientsData = {
    newPatients: { count: 25.5, growth: 15 },
    oldPatients: { count: 150.3, growth: 12 }
  };
  
  const genderData = {
    labels: ['Male', 'Female','Others', 'Children'],
    datasets: [
      {
        data: genderDataArray,
        backgroundColor: ['#FFA500', '#FF6347', '#32CD32', '#3A32CD'],
        borderWidth: 0,
      },
    ],
  };

  const genderOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  // fetching data
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`https://relience-test-backend.onrender.com/api/v1/dashboard/patientsCount`);
      if(response){
        setPatientsCount(response.data.totalUsersCount)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was an error fetching the patient data. Please try again.");
    }
  };
  const fetchNews = async () => {
    try {
      const response = await axios.get(`https://relience-test-backend.onrender.com/api/v1/dashboard/newsCount`);
      if(response){
        setNewsCount(response.data.totalNewsCount)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was an error fetching the patient data. Please try again.");
    }
  };
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`https://relience-test-backend.onrender.com/api/v1/dashboard/blogsCount`);
      if(response){
        setBlogsCount(response.data.totalBlogsCount)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was an error fetching the patient data. Please try again.");
    }
  };
  const fetchRecentPatients = async () => {
    try {
      const response = await axios.get(`https://relience-test-backend.onrender.com/api/v1/allUser`);
      if(response){
        setRecentPatients(response.data.allUser)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was an error fetching the patient data. Please try again.");
    }
  };
  const fetchGender = async () => {
    console.log('Fetching gender data...');
    try {
      const response = await fetch('http://localhost:9000/api/v1/dashboard/gender');
      if (!response.ok) {  // Check if response is successful
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();  // Parse the JSON response
      console.log('Response:', data);
      if (data) {
        console.log('Gender Overview:', data.genderOverview);
        setMaleCount(data.genderOverview.maleCount)
        setFemaleCount(data.genderOverview.femaleCount)
        setOthersCount(data.genderOverview.othersCount)
        setChildrenCount(data.genderOverview.childrenCount)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("There was an error fetching the gender data. Please try again.");
    }
  };
  
  // Log state values after they are updated
  useEffect(() => {
    const updatedArray = [maleCount, femaleCount, othersCount, childrenCount];
    setGenderDataArray(updatedArray); // Assuming setGenderDataArray is a setter function for state
  }, [maleCount, femaleCount, othersCount, childrenCount]);
  
  useEffect(() => {
    console.log('genderDataArray--', genderDataArray);
  }, [genderDataArray]);
  

  function formatCount(count) {
    if (count >= 10000000) {  // 1 crore (10 million)
      return (count / 10000000).toFixed(1) + 'Cr';
    } else if (count >= 100000) {  // 1 lakh (100 thousand)
      return (count / 100000).toFixed(1) + 'L';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    } else {
      return count;
    }
  }
  


  useEffect(() => {
    setTimeout(() => {
      setPagination({
        ...pagination,
        total: recentPatients.length,
      });
      setLoading(false);
    }, 2000);

    const userInfoFromLocalStorage = localStorage.getItem('userInfo');
    if (userInfoFromLocalStorage) {
      setUserInfo(JSON.parse(userInfoFromLocalStorage));
    }

    fetchGender()
    fetchRecentPatients()
    fetchPatients()
    fetchNews()
    fetchBlogs()
  }, []);

  if (!userInfo) {
    return null;
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);

    const sortedData = [...recentPatients].sort((a, b) => {
      if (sorter.order === 'ascend') {
        return a[sorter.field] > b[sorter.field] ? 1 : -1;
      } else if (sorter.order === 'descend') {
        return a[sorter.field] < b[sorter.field] ? 1 : -1;
      }
      return 0;
    });
    setRecentPatients(sortedData);
  };

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="patient-name">
          <img
            src={record.image}
            alt="avatar"
            className="patient-avatar"
          />
          <span>{text}</span>
        </div>
      ),
    },
    // {
    //   title: 'Patient ID',
    //   dataIndex: 'id',
    //   key: 'id',
    //   sorter: (a, b) => a.id - b.id,
    // },
    {
      title: 'Phone No',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'DOB',
      key: 'DOB',
      render: (DOB) => format(new Date(DOB), 'dd/MM/yyyy'),
      sorter: (a, b) => new Date(a.DOB) - new Date(b.DOB),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => (
        <Tag
          color={status === 'Active' ? '#e6f7e9' : '#ffebee'}
          style={{
            color: status === 'Active' ? '#52c41a' : '#f5222d',
            border: 'none',
            borderRadius: '4px',
            padding: '2px 8px',
          }}
        >
          {status}
        </Tag>
      ),
    }
  ];


  return (
    <div className="dashboard">
      <h1>Welcome, {userInfo.name}</h1>
      <p>Have a nice day at great work</p>

      <div className="row" style={{ cursor:"pointer" }} onClick={() => navigate('/newsList')}>
        <div className="col-lg-4 mb-4">
          <Card>
            <div className="statistics-data">
              <div className="statistics-icons-1">
                <CalendarOutlined />
              </div>
              <Statistic 
                title="Total News"
                value={formatCount(newsCount)} 
              />
            </div>
          </Card>
        </div>
        <div className="col-lg-4 mb-4" style={{ cursor:"pointer" }} onClick={() => navigate('/patients')}>
          <Card>
            <div className="statistics-data">
              <div className="statistics-icons-2">
                <UserOutlined />
              </div>
              <Statistic 
                title="Total Patients" 
                value={formatCount(patientsCount)} 
              />
            </div>
          </Card>
        </div>
        <div className="col-lg-4 mb-4" style={{ cursor:"pointer" }} onClick={() => navigate('/blogList')}>
          <Card>
            <div className="statistics-data">
              <div className="statistics-icons-3">
              <BoldOutlined />
              </div>
              <Statistic 
                title="Total Blogs" 
                value={formatCount(blogsCount)} 
              />
            </div>
          </Card>
        </div>
      </div>


      <div className="row mb-4">
        <div className="col-12">
          <Card title="Total Patients">
            <div className='total--patient'>
              <div className='radial--guage'>
                <RadialGauge value={formatCount(patientsCount)} />
              </div>
              <div className='total--patient-graph'>
                <Bar options={options} data={data} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <Card title="Appointment Request's" className="appointment-requests-card">
            <List
              itemLayout="horizontal"
              dataSource={appointmentRequests}
              renderItem={item => (
                <List.Item
                  extra={
                    <Tag
                      color={item.status === 'Confirmed' ? '#e6f7e9' : '#ffebee'}
                      style={{
                        color: item.status === 'Confirmed' ? '#52c41a' : '#f5222d',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '2px 8px',
                      }}
                    >
                      {item.status}
                    </Tag>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} size={40} />}
                    title={<span style={{ fontWeight: 'bold' }}>{item.name}</span>}
                    description={<span style={{ color: '#8c8c8c' }}>{item.time}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>

        <div className="col-lg-4 mb-4">
          <div>
            <Card title="Patient's" className="patients-card">
              <div className="patient-item">
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87CEFA', marginRight: '10px' }} />
                <div className="patient-info">
                  <div className="patient-count">{patientsData.newPatients.count}k</div>
                  <div className="patient-type">New Patient</div>
                </div>
                <Tag color="#FFF0F5" className="growth-tag">
                  <span style={{ color: '#FF69B4' }}>{patientsData.newPatients.growth}% Growth</span>
                </Tag>
              </div>
              <div className="patient-item">
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#DDA0DD', marginRight: '10px' }} />
                <div className="patient-info">
                  <div className="patient-count">{patientsData.oldPatients.count}k</div>
                  <div className="patient-type">Old Patient</div>
                </div>
                <Tag color="#F0FFF0" className="growth-tag">
                  <span style={{ color: '#32CD32' }}>{patientsData.oldPatients.growth}% Growth</span>
                </Tag>
              </div>
            </Card>
          </div>

          <div className='mt-4'>
            <Card
              title="Gender"
              // extra={
              //   <span style={{ color: '#8c8c8c' }}>
              //     <DatePicker onChange={onChange} />
              //   </span>
              // }
              className="gender-card"
            >
              <center>
                <div style={{ height: '180px' }}>
                  <Doughnut data={genderData} options={genderOptions} />
                </div>
              </center>
              <div className="gender-legend">
                {genderData.labels.map((label, index) => (
                  <div key={label} className="gender-legend-item">
                    <span
                      className="gender-color-box"
                      style={{ backgroundColor: genderData.datasets[0].backgroundColor[index] }}
                    ></span>
                    <span className="gender-label">{label}</span>
                    <span className="gender-percentage">{genderData.datasets[0].data[index]}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
        <div className="col-lg-4 mb-4">
          <div className="appointment-card">
            <h2 className='appoint-head'>Today's Appointment</h2>

            <div className="date-section">
              <div>
                <p>July 18, 2024</p>
                <p>Today</p>
              </div>
              <div>
                <FiCalendar />
              </div>
            </div>

            <div className="calendar-strip">
              {['16', '17', '18', '19', '20', '21'].map((day, index) => (
                <div key={index} className={day === '18' ? 'day active' : 'day'}>
                  <span className="number">{day}</span>
                  <span className="weekday">
                    {['Tu', 'Wed', 'Th', 'Fr', 'Sa', 'Su'][index]}
                  </span>
                </div>
              ))}
            </div>

            <List
              itemLayout="horizontal"
              dataSource={[
                { name: 'Marvin McKinney', type: 'Hospital Consulting', time: 'On Going' },
                { name: 'Bessie Cooper', type: 'Video Consulting', time: '1.30 PM' },
                { name: 'Jacob Jones', type: 'Emergency', time: '11.00 PM' },
                { name: 'Robert Fox', type: 'Hospital Consulting', time: '1.30 PM' },
                { name: 'Guy Hawkins', type: 'Video Consulting', time: '3.00 PM' },
                { name: 'Theresa Webb', type: 'Emergency', time: '5.30 PM' },
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`path/to/${item.name.toLowerCase().replace(' ', '_')}.jpg`} />}
                    title={item.name}
                    description={item.type}
                  />
                  <div>{item.time}</div>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Spin spinning={loading}>
            <Card title="Recent Patient's">
              <Table
                dataSource={recentPatients}
                columns={columns}
                pagination={pagination}
                onChange={handleTableChange}
              />
            </Card>
          </Spin>
        </div>
      </div>
    </div>
  );
};



const RadialGauge = ({ value }) => {
  const value1 = 50;
  const value2 = 100;
  const value3 = 150;

  const data = {
    datasets: [
      {
        data: [value1, value2, value3],
        backgroundColor: ['#00963F', '#65C98F', '#C1EAD3'],
        borderWidth: 0,
        circumference: 270,
        rotation: 225,
      },
    ],
  };

  const gaugeOptions = {
    cutout: '75%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '200px' }}>
      <Doughnut data={data} options={gaugeOptions} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '24px', fontWeight: '600', fontFamily: "Inter" }}>{value}</div>
        <div style={{ fontSize: '14px', fontFamily: "Inter" }}>Total Patients</div>
      </div>
    </div>
  );
};

export default Dashboards;