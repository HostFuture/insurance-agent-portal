// Importing Build-In Package
import Chart from "react-apexcharts";
import { useState, useEffect, useCallback } from "react";
import { Select, Card, Col, Row, Typography, Skeleton } from "antd";

// Importing Custom Package
import { authFetch } from "./auth";


const { Title } = Typography;
const OPTIONS = ["North", "West", "South", "East"]


const ScoreCard = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter(items => !selectedItems.includes(items));

  const getPolicyData = useCallback(() => {
    authFetch("/policy/stats", {
      method: "POST",
      body: JSON.stringify({ query: selectedItems })
    }).then(r => r.json()
    ).then(response => {
      if(response.status === 200) {
        setOptions({
          chart: {
            height: 350,
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: "top",
              },
            }
          },
          dataLabels: {
            enabled: true,
            offsetY: 20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
          
          xaxis: {
            categories: response.data.month,
            position: "top",
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false
            }
          
          },
          title: {
            text: "Monthly Registered Policies, 2018",
            floating: true,
            offsetY: 530,
            align: "center",
            style: {
              color: "#444"
            }
          }
        });

        setSeries([
          {
            name: "Policy",
            data: response.data.count
          }
        ]);
      }
    });
  }, [selectedItems]);

  useEffect(() => {
    getPolicyData();
  }, [selectedItems, getPolicyData]);

  return(
    <Card style={{ width: "100%", borderRadius: "5px" }}>
      <Row style={{ marginBottom: "2vh" }}>
        <Col style={{ width: "30%" }}>
          <Title level={3}>Policies</Title>
        </Col>
        <Col style={{ width: "40%" }}></Col>
        <Col style={{ width: "30%" }}>
          <Select mode="multiple" placeholder="Select a region to filter" style={{ width: "100%" }}
            value={ selectedItems } onChange={(updatedItems) => setSelectedItems(updatedItems)} >
            {
              filteredOptions.map(item => (
                <Select.Option key={ item } value={ item }>{ item }</Select.Option>
              ))
            }
          </Select>
        </Col>
      </Row>

      { series.length > 0 
        ? <Chart options={ options } series={ series } type="bar" height={550} />
        : <Skeleton active />
      }

    </Card>
  );
}

export default ScoreCard;