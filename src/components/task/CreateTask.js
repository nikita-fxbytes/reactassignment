import api from "../../api/tasks";
import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import messageContext from '../common/message/context/messageContext';

const CreateTask = () => {
  const navigate = useNavigate();  //redirect another page

  //show message
  const context = useContext(messageContext);
  const {showMessage} = context;
  // End

  const [loader, setLoader]= useState(false)// lodader

  // Form value and error
  const intialValues = {
    name:"", 
    description: ""
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  // End
  // Change input value
  const handleChange = (e) =>{
    const{name , value} = e.target;
    setFormValues({...formValues, [name]: value});
  }
  // End
 
  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const task = {
        name: formValues.name,
        description: formValues.description
      };
      addTask(task);
    }
  };
  // End
  // Add Task
  const addTask = async(formValues) =>{
    setLoader(true)
    // API call
    const task = { name:formValues.name, description:formValues.description } 
    try {
      const res = await api.post('/task', task)
      const resData = res.data;
      if(resData.status === true){
        setLoader(false)
        showMessage({
            message:resData.message,
            type:'success'
          });
          navigate('/');
      }
    } catch (error) {
      setLoader(false)
      const message = error.response.data.message;
        showMessage({
            message:message,
            type:'danger'
        });
    }
  }
  // End
  // Validation
  const validate =(values)=>{
    const errors = {};
    if (!values.name){
      errors.name = "Name is required!";
    }else if(values.name.length <3){
      errors.name = "Name must be more than 3 characters";
    }
    if (!values.description){
      errors.description = "Description is required!";
    }
    return errors;
  }
  // End
  return (
      <>
        <div>
          <h3 className="mb-3">Create New Task</h3>
        </div>
        <Form className="border p-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name<span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Enter Name" name="name" value={formValues.name}
            onChange={handleChange}/>
            <Form.Text className="text-danger">
              {formErrors.name}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description<span className="text-danger">*</span></Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formValues.description}
            onChange={handleChange}/>
              <Form.Text className="text-danger">
              {formErrors.description}
              </Form.Text>
          </Form.Group>
          <Button variant="dark" type="submit" disabled={loader}>
          {loader && <span className="spinner-border spinner-border-sm me-1"></span>}<span>Submit</span>
          </Button>
        </Form>
      </>
  )
}

export default CreateTask;
