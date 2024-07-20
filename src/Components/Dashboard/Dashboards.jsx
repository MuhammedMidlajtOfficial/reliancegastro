import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table, List, Avatar, Tag, Calendar } from 'antd';
import { UserOutlined, VideoCameraOutlined, CalendarOutlined } from '@ant-design/icons';

const Dashboards = () => {
  const appointmentRequests = [/* ... */];
  const patientsData = { newPatients: 25.5, oldPatients: 150.3 };
  const todaysAppointments = [/* ... */];
  const recentPatients = [/* ... */];

  return (
    <div className="dashboard">
      <h1>Welcome, Dr. Navaneethan M</h1>
      <p>Have a nice day at great work</p>

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Appointments" value={25.2} suffix="k" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Patients" value={150.5} suffix="k" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Video Consulting" value={50.4} suffix="k" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="Total Patients">
            
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Appointment Request's">
            <List
              itemLayout="horizontal"
              dataSource={appointmentRequests}
              renderItem={item => (
                <List.Item
                  extra={
                    <Tag color={item.status === 'Confirmed' ? 'green' : 'red'}>
                      {item.status}
                    </Tag>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.name}
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Card title="Patient's">
            <Statistic title="New Patient" value={patientsData.newPatients} suffix="k" />
            <Progress percent={15} size="small" status="active" />
            <Statistic title="Old Patient" value={patientsData.oldPatients} suffix="k" />
            <Progress percent={12} size="small" status="active" />
          </Card>
        </Col>
        <Col span={8}>
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
        </Col>
        <Col span={8}>
          <Card title="Gender">
            
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
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
        </Col>
      </Row>
    </div>
  );
};

export default Dashboards;