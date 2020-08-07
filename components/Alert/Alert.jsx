import styled from 'styled-components';

const textColor = '#149173';

const AlertStyle = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  display: flex;
  border: 1px solid #CACFD2;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 4px;
  width: 100%;
`;

const Heading6 = styled.h6`
  padding: 0;
  margin: 0;
  color: ${textColor};
`;

const Box = styled.div`
  display: ${props => props.display || 'flex'};
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  width: 100%;
`;

const Paragraph = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 0;
  color: #23A973;
`;

const Alert = React.forwardRef((props, ref) => {
  const {
    children,
    eventData: event,
  } = props;
  return(
    <AlertStyle ref={ref}>
      <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
        <Heading6>{event.event_type ? event.event_type : 'Unknown event'}</Heading6>
        <Paragraph>Filename: {event.file_name ? event.file_name : 'Unknown file name'}</Paragraph>
        <Paragraph>Initiator: {event.triggered_by ? (event.triggered_by.handle ? event.triggered_by.handle : 'Unknown initiator') : 'Unknown initiator'}</Paragraph>
      </Box>
    </AlertStyle>
  );
  
});

export default Alert;
