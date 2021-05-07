import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
  return(
    <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
             <CardTitle>{dish.name}</CardTitle>
             <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
     </div>
       );
}

function RenderComments({comments}) {
if(comments != null) {
  const commentListItems = comments.map((comment) =>
     {
       return (
              <li key={comment.id}>
                 <p> {comment.comment} </p>
                 <p>--- {comment.author}, {new Intl.DateTimeFormat('en-US',{ year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
              </li>
       );
     });
     return (
       <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
             { commentListItems }
          </ul>
          <CommentForm />
       </div>
     );
}
else {
  return(
    <div></div>
  );
}
}

const DishDetail= (props) => {
  if (props.dish != null) {
    return(
      <div className="container">
        <div className="row">
         <Breadcrumb>
             <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
             <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
         </Breadcrumb>
         <div className="col-12">
           <h3>{props.dish.name}</h3> <hr />
         </div>
        </div>
        <div className="row">
              <RenderDish dish={props.dish} />
              <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  else {
    return (<div></div>);
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      rating: '',
      username: '',
      comment: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleInputChange(event) {
    const target= event.target;
    const value= target.value;
    const name= target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    console.log("Current State is: " + JSON.stringify(this.state));
    alert("Current State is: " + JSON.stringify(this.state));
    event.preventDefault();
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: {...this.state.touched, [field]: true }
    });
  }

  render() {
    return(
      <div>
        <Button outline onClick={this.toggleModal}>
           <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
           <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
           <ModalBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label htmlFor="rating">Rating</Label>
                  <Input type="select" name="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="username">Your Name</Label>
                  <Input type="text" id="username" name="username"/>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="comment" md={2}>Comment</Label>
                    <Col md={10}>
                      <Input type="textarea" id="comment" name="comment" rows="6" />
                    </Col>
                </FormGroup>
                <Button type="submit" value="submit" className="bg-primary">Submit</Button>
              </Form>
           </ModalBody>
        </Modal>
      </div>
    );
  }
}



export default DishDetail;
