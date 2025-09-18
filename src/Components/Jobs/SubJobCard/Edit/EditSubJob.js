import { useEffect, useState } from "react";
import { SubJobService } from "../../../../Services/SubJobs/SubJobService";

function EditSubJob({ state, id, name, description }) {    
  const [subJobName, setSubJobName] = useState( name | null )
  const [subJobDescription, setSubJobDescription] = useState( description | null)

  useEffect(() => {
    setSubJobName(name);
    setSubJobDescription(description)
  }, [name, description])  
  
const subJobId = id;  

const submitForm = () => {
  const id = subJobId
  SubJobService.EditSubJob(id, {subJobName,subJobDescription,})
  .then((res) => {
    state('', false, null);
  })  
}

  if (id) {
    return (
      <>                        
        <input type='text' defaultValue={name} onChange={(e) => setSubJobName(e.target.value)} />
        <input type='text' defaultValue={description} onChange={(e) => setSubJobDescription(e.target.value)} />
        <button onClick={submitForm}>Submit Change</button>
      </>
    );
  } else {
    return <p>Empty component</p>;
  }
}

export default EditSubJob;
