import React from 'react'
import {
  Jumbotron,
  Carousel,
  Image,
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap'

export const GeneralHome = () => {
  return (
    <div>
      <Jumbotron className="jumbo">
        <h1>Welcome to Chug Mugs!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary" href="/mugs">
            Browse Mugs
          </Button>
        </p>
      </Jumbotron>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="imgs/brickwall-backdrop-mugs.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="imgs/bunny-mugs.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="imgs/beer-mug.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image
              src="https://i.etsystatic.com/19238805/r/il/0e0cc5/1779655278/il_794xN.1779655278_lf6d.jpg"
              thumbnail
            />
          </Col>
          <Col xs={6} md={4}>
            <Image
              src="https://i.etsystatic.com/10720285/r/il/0404c9/2180523603/il_794xN.2180523603_k3ny.jpg"
              thumbnail
            />
          </Col>
          <Col xs={6} md={4}>
            <Image
              src="https://i.etsystatic.com/16606162/r/il/158e37/1614180469/il_794xN.1614180469_nzsq.jpg"
              thumbnail
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
