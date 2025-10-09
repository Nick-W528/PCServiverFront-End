import { Box, Button, Drawer, Select, TextField } from "@mui/material";
import { useState } from "react";
import { JobService } from "../../../Services/Jobs/JobService";
import { useUser } from "../../Utils/UserContext.js";

function CreateJob({onJobCreated}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {currentUser} = useUser();

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const createJob = (event) => {
    event.preventDefault();
    setLoading(true);    
    try {
        JobService.CreateJob({
            userId: currentUser._id,
            name: event.target.name.value,
            status: event.target.status.value,
            description: event.target.description.value,
            dueDate: event.target.dueDate.value,
            type: event.target.type.value,
        })

        setOpen(false);
        onJobCreated();
    } catch (error) {
        console.error("Error creating job:", error);
    } finally {
        setLoading(false);
    }
  }

  return (
    <Box>
      <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        sx={{
          backgroundColor: "#F4DFC8",
          color: "#0c0c0c",
          border: "2px solid #F4DFC8",
          fontWeight: "bold",
          minWidth: '100%',
          borderRadius: 0,
          "&:hover": {
            backgroundColor: "#0c0c0c",
            color: "#F4DFC8",
            border: "2px solid #F4DFC8",
          },
        }}
      >
        Create Job
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 450,
            p: 3,
            backgroundColor: "#1c1c1c",
            color: "#F4DFC8",
          },
        }}
      >
        <h2>Create New Job</h2>
        <Box component="form" onSubmit={createJob} sx={{ mt: 2 }}>
          <TextField name="name" label="Job Name" fullWidth margin="normal" InputLabelProps={{ style: {color: "#F4DFC8"}}} />
          <TextField name="status" label="Job Status" fullWidth margin="normal" InputLabelProps={{ style: {color: "#F4DFC8"}}} />
          <TextField
            name="description"
            label="Job Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}            
          />
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Select name="type" label="Job Type" fullWidth margin="normal">
            <option value="repair">Repair</option>
            <option value="maintenance">Maintenance</option>
          </Select>
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#F4DFC8",
              color: "#0c0c0c",
              border: "2px solid #F4DFC8",
              fontWeight: "bold",
              minWidth: 200,
            }}
          >
            Create
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default CreateJob;
