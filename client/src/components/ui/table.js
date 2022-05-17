// Importing Build-In Package
import { useState } from "react";
import { EditFilled } from '@ant-design/icons';
import { Table, Tooltip, Button, InputNumber, Modal, message } from "antd";

// Importing Custom Package
import { authFetch } from "./auth";



const TableElement = ({ data, onSearch }) => {
  const [premium, setPremium] = useState(0);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: "Policy Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Customer Id",
      dataIndex: "customer_id",
      key: "customer_id"
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle_segment",
      key: "vehicle_segment",
      render: vehicle_segment => vehicle_segment.split(".")[1]
    },
    {
      title: "Region",
      dataIndex: "cusromer_region",
      key: "cusromer_region",
      render: cusromer_region => cusromer_region.split(".")[1]
    },
    {
      title: "Income Group",
      dataIndex: "customer_income_group",
      key: "customer_income_group"
    },
    {
      title: "Gender",
      dataIndex: "customer_gender",
      key: "customer_gender",
      render: customer_gender => customer_gender.split(".")[1]
    },
    {
      title: "Premium",
      dataIndex: "premium",
      key: "premium",
      render: premium => <>$ {premium}</>
    },
    {
      title: "Purchase Date",
      dataIndex: "purchase_date",
      key: "purchase_date",
      render: purchase_date => purchase_date.split("T")[0]
    }, 
    {
      title: "Actions",
      key: 'action',
      render: (text, record) => (
        <Tooltip title="Edit Record">
          <Button type="primary" icon={ <EditFilled /> } onClick={() => edit_actions(record)}/>
        </Tooltip>
      ),
    }
  ];

  const edit_actions = (record) => {
    setPremium(record.premium);
    setCurrentRecord(record.id);
    setIsModalVisible(true);
  }

  const handleOk = () => {
    authFetch(`/policy/update/${currentRecord}`, {
      method: "POST",
      body: JSON.stringify({ premium: premium })
    }).then(r => r.json()
    ).then(response => {
      if(response.status === 200) {
        onSearch(currentRecord);
        handleCancel();
      } else {
        message.error(response.message)
      }
    });
  }

  const handleCancel = () => {
    setPremium(0);
    setCurrentRecord(null);
    setIsModalVisible(false);
  }

  return(
    <>
      <Table columns={columns} dataSource={data} style={{ margin: "5vh 0" }}/>
      <Modal title="Edit Policy Premium" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <InputNumber addonBefore="$" onChange={(value) => { setPremium(value) }} value={premium} style={{ width: "100%" }} />
      </Modal>
    </>
  );
}

export default TableElement;