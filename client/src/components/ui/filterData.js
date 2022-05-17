// Importing Build-In Package
import { useState } from "react";
import { Card, Empty, Input } from "antd";

// Importing Custom Package
import { authFetch } from "./auth";
import TableElement from "./table";


const { Search } = Input;


const FilterData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(true);

  const onSearch = (search) => {
    authFetch(`/policy/find/${search}`
    ).then(r => r.json()
    ).then(response => {
      if(response.status === 200) {
        setData(response.data);
        setError(false);
      } else {
        setError(true);
      }
    });
  }

  return(
    <Card style={{ width: "100%", borderRadius: "5px", height: "80vh" }}>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Search placeholder="Enter Policy ID or Customer ID" allowClear onSearch={onSearch} style={{ width: "50vh" }} />
      </div>

      {
        error 
        ? <Empty style={{ margin: "5vh" }}/>
        : <TableElement data={data} onSearch={onSearch} />
      }
    </Card>
  );
}

export default FilterData;