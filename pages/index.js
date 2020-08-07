import { useState } from 'react';
import useSocket from '../hooks/useSocket';
import FlipMove from 'react-flip-move';
import Head from 'next/head';
import Alert from '../components/Alert';
import styled from 'styled-components';

import styles from '../styles/Home.module.css';

const Box = styled.div`
  display: ${props => props.display || 'flex'};
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
	align-items: ${props => props.alignItems};
	height: 80vh;
	overflow: hidden;
	width: 400px;
`;

export default function ChatOne() {
	const [events, setEvents] = useState([]);

	const getUniqueKey = () => {
		const key = Date.now();
		// console.log(key);
		return key;
	}

	useSocket('events', (e) => {
		e['uid'] = getUniqueKey();
		setEvents(events => [e, ...events])
		// console.log(e)
	});

	return (
		<div className={styles.container}>
				<Head>
					<title>Figma Web Feed</title>
				</Head>
				<Box>
					<FlipMove enterAnimation="fade" leaveAnimation="fade" verticalAlignment="top" style={{width: '100%'}}>
						{events && events.map((event) =>
							<Alert key={event.uid} eventData={event} />
						)}
					</FlipMove>
					</Box>
			</div>
	);
}

// ChatOne.getInitialProps = async () => {

// };
