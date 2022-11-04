import React from "react";

function TablesCardInfo({ tablesData }) {
    const occupiedTables = tablesData.filter((table) => table.reservation_id !== null)
    const freeTables = tablesData.filter((table) => table.reservation_id === null)

    const cards = (
        <div className="row">
          <div className="col-sm-6">
            <div className="card table-free-card">
              <div className="card-body">
                <h5 className="card-title">Free Tables</h5>
                    <h1>{freeTables.length}</h1>
                
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card table-occupied-card">
              <div className="card-body">
                <h5 className="card-title">Occupied Tables</h5>
                    <h1>{occupiedTables.length}</h1>
              </div>
            </div>
          </div>
        </div>
      );
    
      return (
        <React.Fragment>
            {cards}
            <br></br>
        </React.Fragment>
      );
    }

export default TablesCardInfo