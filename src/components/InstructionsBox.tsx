import {Popper, Theme, useTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {AnimatePresence, motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {instructions} from '../constants/Instructions';
import {RootState} from '../services/redux/rootReducer';
import {useEffectUnsafe} from '../services/unsafeHooks';


export interface StyleProps {
	arrowPos: 'top' | 'right' | 'bottom';
	arrowOffset: number | string;
	isArrowOffsetDirectionInverted: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
	instructionsBox: {
		color: theme.palette.background.paper,
		backgroundColor: 'currentColor',
		position: 'relative',
		top: '0px',
		borderRadius: '5px',
		boxShadow: '0px 0px 41px -11px rgba(0,0,0,0.7)',
		'&::after': {
			content: "''",
			position: 'absolute',
		},
	},
	instructionsBoxTop: {
		left: '0px',
		'&::after': {
			left: ({arrowOffset, isArrowOffsetDirectionInverted}:arrowPosition) =>
				getConditionalPos(!isArrowOffsetDirectionInverted, arrowOffset, theme),
			right: ({arrowOffset, isArrowOffsetDirectionInverted}:arrowPosition) =>
				getConditionalPos(isArrowOffsetDirectionInverted, arrowOffset, theme),
			top: '-13px',
			borderLeft: `7px solid transparent`,
			borderRight: `7px solid transparent`,
			borderBottom: `14px solid currentColor`,
			marginLeft: '-6px',
		},
	},
	instructionsBoxBottom: {
		left: '0px',
		'&::after': {
			left: ({arrowOffset, isArrowOffsetDirectionInverted}:arrowPosition) =>
				getConditionalPos(!isArrowOffsetDirectionInverted, arrowOffset, theme),
			right: ({arrowOffset, isArrowOffsetDirectionInverted}:arrowPosition) =>
				getConditionalPos(isArrowOffsetDirectionInverted, arrowOffset, theme),
			bottom: '-13px',
			borderLeft: `7px solid transparent`,
			borderRight: `7px solid transparent`,
			borderTop: `14px solid currentColor`,
			marginLeft: '-6px',
		},
	},
	instructionsBoxRight: {
		left: '5px',
		marginRight: '20px',
		flex: 1,
		'&::after': {
			top: ({arrowOffset, isArrowOffsetDirectionInverted}:arrowPosition) =>
				getConditionalPos(!isArrowOffsetDirectionInverted, arrowOffset, theme),
			bottom: ({arrowOffset, isArrowOffsetDirectionInverted}:arrowPosition) =>
				getConditionalPos(isArrowOffsetDirectionInverted, arrowOffset, theme),
			right: '-13px',
			borderTop: `7px solid transparent`,
			borderBottom: `7px solid transparent`,
			borderLeft: `14px solid currentColor`,
		},
	},
	closeButton: {
		margin: theme.spacing(1, -1, 0, 1),
		backgroundColor: theme.palette.background.paper,
		boxShadow: 'none',
		float: 'right',
	},
	linkButton: {
		textTransform: 'none',
		textDecoration: 'underline',
		marginTop: theme.spacing(-1.5),
		fontWeight: 'normal',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	typography: {
		margin: theme.spacing(0, 2, 0, 2),
	},
	gridContainer: {
		paddingLeft: ({arrowPos}) => (arrowPos === 'right' ? 5 : 0),
		width: '100%',
	},
}));

type ComponentsTooltipProps = {
	show: boolean;
	customText?: JSX.Element | null;
	width?: string | number;
	anchor?: HTMLElement | null;
};

const InstructionsBox = (props: ComponentsTooltipProps) => {
	const {show, width, anchor} = props;

	const [isVisible, setIsVisible] = useState(true);
	const {instructionsStepNum, areInstructionsVisible} = useSelector((state: RootState) => state.App, shallowEqual);

	const theme = useTheme();
	const classes = useStyles(instructions[instructionsStepNum ?? 0]);
	

	
	
	const isHiddenPermanently = localStorage.getItem('hideHelp') === 'true';

	useEffect(() => {
		setIsVisible(show);
	}, [show]);

	useEffectUnsafe(() => {
		setIsVisible(show);
	}, [instructionsStepNum]);

	const box = (
		<Grid
			container
			className={classes.gridContainer}
			
			alignContent='flex-start'
		>
			<AnimatePresence exitBeforeEnter>
				{isVisible && areInstructionsVisible && !isHiddenPermanently && (
					<motion.div
						style={{width: anchor ? undefined : width, zIndex: 1275}}
						
						initial='from'
						animate='to'
					>
						</motion.div>
				)}
			</AnimatePresence>
		</Grid>
	);

	const withPopper = isVisible && anchor && (
		<Popper
			style={{marginTop: theme.spacing(2), width, zIndex: 1000}}
			id='popper'
			open
			anchorEl={anchor}
			placement='bottom'
			modifiers={{
				flip: {
					enabled: false,
				},
			}}
		>
			{box}
		</Popper>
	);

	const component = anchor ? withPopper : box;

	return <>{isVisible && component}</>;
};
export default InstructionsBox;

const getConditionalPos = (shouldReturnPos: boolean, offset: string | number, theme: Theme) => {
	if (!shouldReturnPos) {return null;}

	if (typeof offset === 'string') {return offset;}

	return theme.spacing(offset);
};





type arrowPosition = {
arrowOffset: number
	isArrowOffsetDirectionInverted: boolean
}