import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function RemoteCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (<div>
    { props.rows.map((row, ind) => {
      <h3>{row.id}</h3>
      (<Card key={ind} className={classes.root} variant="outlined">
        <CardContent>
          { Object.entries(row).map((field, key) => {
            console.log(key);
            if(props.columns[key] == undefined){
              console.log(key);
              return;
            }
            if(props.columns[key].valueFormatter !== undefined) {
              return props.columns[key].valueFormatter(field)
            }
            else
              return (
                <Typography variant="h5" component="h2">
                {props.columns[key].label}: {field}
                </Typography>
              )
          })}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>)
    })
    }</div>
  );
}