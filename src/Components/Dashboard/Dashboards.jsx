import React, { useState } from 'react';
import { Card, Statistic, Table, List, Avatar, Tag, Calenda, DatePicker, Calendar } from 'antd';
import { UserOutlined, VideoCameraOutlined, CalendarOutlined } from '@ant-design/icons';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboards = () => {
  const todaysAppointments = [];
  const recentPatients = [];

  const [selectedDate, setSelectedDate] = useState(null);

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
    labels: ['Male', 'Female', 'Children'],
    datasets: [
      {
        data: [45, 80, 65],
        backgroundColor: ['#FFA500', '#FF6347', '#32CD32'],
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


  return (
    <div className="dashboard">
      <h1>Welcome, Dr. Navaneethan M</h1>
      <p>Have a nice day at great work</p>

      <div className="row mb-4">
        <div className="col-lg-4">
          <Card>
            <div className="statistics-data">
              <div className="statistics-icons-1">
                <CalendarOutlined />
              </div>
              <Statistic value={25.2} title="Appointments" suffix="k" />
            </div>
          </Card>
        </div>
        <div className="col-lg-4">
          <Card>
            <div className="statistics-data">
              <div className="statistics-icons-2">
                <UserOutlined />
              </div>
              <Statistic title="Total Patients" value={150.5} suffix="k" />
            </div>
          </Card>
        </div>
        <div className="col-lg-4">
          <Card>
            <div className="statistics-data">
              <div className="statistics-icons-3">
                <VideoCameraOutlined />
              </div>
              <Statistic title="Total Video Consulting" value={50.4} suffix="k" />
            </div>
          </Card>
        </div>
      </div>


      <div className="row mb-4">
        <div className="col-12">
          <Card title="Total Patients">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20%', marginRight: '20px' }}>
                <RadialGauge value={150.5} />
              </div>
              <div style={{ width: '80%' }}>
                <Bar options={options} data={data} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-4">
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

        <div className="col-lg-4">
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
              extra={
                <span style={{ color: '#8c8c8c' }}>
                  <DatePicker onChange={onChange} />
                </span>
              }
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
        <div className="col-lg-4">
          <Card title="Today's Appointment">
            <Calendar fullscreen={false} />
            <List
              itemLayout="horizontal"
              dataSource={todaysAppointments}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.name}
                    description={item.type}
                  />
                  <div>{item.time}</div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Card title="Recent Patient's">
            <Table dataSource={recentPatients} columns={[
              { title: 'Patient Name', dataIndex: 'name', key: 'name' },
              { title: 'Patient ID', dataIndex: 'id', key: 'id' },
              { title: 'Phone No', dataIndex: 'phone', key: 'phone' },
              { title: 'Date', dataIndex: 'date', key: 'date' },
              { title: 'Gender', dataIndex: 'gender', key: 'gender' },
              {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: status => (
                  <Tag color={status === 'In- Process' ? 'green' : 'red'}>
                    {status}
                  </Tag>
                )
              },
            ]} />
          </Card>
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
        <div style={{ fontSize: '24px', fontWeight: '600', fontFamily: "Inter" }}>{value}k</div>
        <div style={{ fontSize: '14px', fontFamily: "Inter" }}>Total Patients</div>
      </div>
    </div>
  );
};

export default Dashboards;