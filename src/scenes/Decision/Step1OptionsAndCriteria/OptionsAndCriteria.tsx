import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, {} from 'react';
import {NOT_ENOUGH_CRITERIA, NOT_ENOUGH_OPTIONS} from '../../../constants/Alerts';

import {OptionsAndCriteriaKeys} from '../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';

import EditableList from './components/EditableList';

const useStyles = makeStyles(theme => ({
	divMain: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: 'center',
	},

	infoButton: {
		bottom: theme.spacing(0.25),
		left: theme.spacing(1.5),
	},

	gridItem: {
		maxWidth: theme.spacing(55),
		margin: theme.spacing(0, 3, 4, 3),
	},
}));

const OptionsAndCriteria: React.FC = () => {
	

	const classes = useStyles();

	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				<Grid item xs={6} className={classes.gridItem}>
					<Typography component='span' variant='h1'>
						Alternatif Hotel
					</Typography>

					<EditableList itemsKey={OptionsAndCriteriaKeys.decisionOptions} notEnoughItemsAlert={NOT_ENOUGH_OPTIONS} />
				</Grid>
				<Grid item xs={6} className={classes.gridItem}>
					<Typography component='span' variant='h1'>
						Variabel Penentu
					</Typography>
					<EditableList itemsKey={OptionsAndCriteriaKeys.selectionCriteria} notEnoughItemsAlert={NOT_ENOUGH_CRITERIA} />
				</Grid>
			</Grid>
			
		</div>
	);
};

export default OptionsAndCriteria;
