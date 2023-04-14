import { Button } from "react-bootstrap"

const DiaLogBox = ({message, onDialog}) => {
  return (
    <div className="position-fixed top-0 start-0 bottom-0 end-0  " style={{
      backgroundColor:"rgba(0,0,0,0.5"
  }}>
    <div className="text-center position-absolute bg-white rounded p-5 top-50 start-50 translate-middle-x">
      <h5 className="mb-4">{message}</h5>
        <div>
            <Button variant="danger"  onClick={()=>onDialog(false)} className="me-3"> No</Button>
            <Button variant="success"  onClick={()=>onDialog(true)} > Yes</Button>
        </div>

      </div>
    </div>
  );
}
export default DiaLogBox
