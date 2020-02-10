import { AppHeader } from "@commure/components-core";
import { CommureSmartApp } from "@commure/components-data";
import SMARTClient from "@commure/smart-core";
import React from "react";
import { FhirDataQuery } from "@commure/components-data";
import { PatientCard } from "@commure/components-core";
import { Bundle, Patient } from "@commure/fhir-types/r4/types";
import "./App.css";
import { Button, ButtonGroup, Popover, Menu, MenuItem, MenuDivider,Divider,NumericInput } from "@commure/components-foundation";

import { Card, Elevation, Intent } from "@commure/components-foundation";

import { smartConfig } from "./config";

const smartClient = new SMARTClient(smartConfig);


function App() {
  return (
    <CommureSmartApp client={smartClient}>
      <AppHeader appName="Prenatal Monitoring Commure App" fixedToTop />
      <div className="hello-world-container">
        <FhirDataQuery  queryString="Patient?_id=9d1c018f-9046-4785-a5f9-038a95de9fe7">
          {({ data, loading }) => {
            if (loading) {
              return "Loading...";
            }
            if (!data) {
              return "Error loading data!";
            }
            /* Rendering each of the patients below here */
            const patients: Patient[] = (data as Bundle).entry!.map(
              value => value.resource as Patient
            );
            return (
              
              <div>
              <Divider className="some-class-name"/>

                {patients.map((patient, index) => ( 
                  <PatientCard key={index} resource={patient} />
                
                ))}
                <Divider className="some-class-name"/>

              </div>
  
            );
          }}
        </FhirDataQuery>
      </div>
      <Card interactive={false} elevation={Elevation.ZERO}>
  <h5><a href="#">Enter Your Vital Signs</a></h5>
  <p>Weight</p>
  <NumericInput
    placeholder="Enter your weight"/>
  <p></p>
  <p>Diastolic Blood Pressure</p>
  <NumericInput
    placeholder="Enter your weight"/>
  <p></p>
  <p>Systolic Blood Pressure</p>
  <NumericInput
    placeholder="Enter your weight"/>
  <p></p>
  <p>Heart Rate</p>
  <NumericInput
    placeholder="Enter your weight"/>
  <p></p>
  <Button intent={Intent.PRIMARY}>Submit</Button>
</Card>
      
    </CommureSmartApp>
  );
}

export default App;
