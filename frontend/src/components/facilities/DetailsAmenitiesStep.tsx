import { Card, Form, Row, Col, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Facility } from 'types';

interface DetailsAmenitiesStepProps {
  formData: Partial<Facility>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newAmenity: string;
  setNewAmenity: (value: string) => void;
  addAmenity: () => void;
  removeAmenity: (index: number) => void;
}

const DetailsAmenitiesStep = ({
  formData,
  handleInputChange,
  newAmenity,
  setNewAmenity,
  addAmenity,
  removeAmenity
}: DetailsAmenitiesStepProps) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">Step 2: Details & Amenities</h5>
      </Card.Header>
      <Card.Body>
        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label className="fw-semibold">Opening Time *</Form.Label>
              <Form.Control
                type="time"
                name="operationalHours.opening"
                value={formData.operationalHours?.opening || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label className="fw-semibold">Closing Time *</Form.Label>
              <Form.Control
                type="time"
                name="operationalHours.closing"
                value={formData.operationalHours?.closing || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="mb-4">
          <Form.Label className="fw-semibold">Amenities</Form.Label>
          <div className="d-flex mb-3">
            <Form.Control
              type="text"
              value={newAmenity}
              onChange={e => setNewAmenity(e.target.value)}
              placeholder="Add an amenity"
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addAmenity();
                }
              }}
            />
            <Button
              variant="primary"
              onClick={addAmenity}
              disabled={!newAmenity.trim()}
              className="ms-2"
            >
              <FontAwesomeIcon icon={faPlus} className="me-1" />
              Add
            </Button>
          </div>

          <div className="d-flex flex-wrap gap-2">
            {formData.amenities?.map((amenity, index) => (
              <Badge
                key={index}
                bg="secondary"
                className="d-flex align-items-center p-2"
              >
                <span className="me-2">{amenity}</span>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 text-white"
                  onClick={() => removeAmenity(index)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </Badge>
            ))}
          </div>

          {(!formData.amenities || formData.amenities.length === 0) && (
            <small className="text-muted">No amenities added yet.</small>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DetailsAmenitiesStep;
