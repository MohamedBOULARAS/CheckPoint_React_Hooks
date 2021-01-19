import './App.css';
import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '100%',
    marginBottom: '10px',
    marginTop: '10px'
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function App() {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);

  const addArticle = (e, article) => {
    console.log(article)
    e.preventDefault()
    setArticles([...articles, article])
    console.log("isekle")
  }
  const [open, setOpen] = useState(false)
  const handleOpen = (props) => {
    setOpen(true);
  };

  const handleClose = (props) => {
    setOpen(false);
  };

  useEffect(() => {
    fetch('articles.json').then(response => response.json())
      .then((data) => {
        setArticles([...data.articles])
      });
  });

  return (
    <div className={classes.root}>
      <Nav myclass={classes} />
      <TheModal addArticle={addArticle} handleClose={handleClose} open={open} classes={classes} />
      <Articles articles={articles} classes={classes} />
      <MyButton classes={classes} handleOpen={handleOpen} />
    </div>
  );
}

const Nav = (props) => {
  const { myclass } = props
  return <AppBar position="static">
    <Toolbar>
      <IconButton
        edge="start"
        className={myclass.menuButton}
        color="inherit"
        aria-label="open drawer"
      >
        <MenuIcon />
      </IconButton>
      <Typography className={myclass.title} variant="h6" noWrap>
        Material-UI
    </Typography>
      <div className={myclass.search}>
        <div className={myclass.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          class={{
            root: myclass.inputRoot,
            input: myclass.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </Toolbar>
  </AppBar>
}
const Articles = (props) => {
  const { classes, articles } = props
  return <React.Fragment>
    <CssBaseline />
    <Container component="div" >
      {articles.map(element => <Article article={element} classes={classes} />)}
    </Container>
  </React.Fragment>
}
const Article = (props) => {
  const { classes, article } = props
  var { author, title, description, url, urlToImage, publishedAt, content } = article
  return (
    <div className={classes.root} >
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={urlToImage} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {publishedAt}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {url}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {content}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
const TheModal = (props) => {
  const { handleClose, open, classes, addArticle } = props
  const [title, setTitle] = useState('Controlled');
  const [desc, setDesc] = useState('Controlled');

  const handleTitleChange = (e) => {
    e.preventDefault()
    setTitle(e.target.value)
  }
  // const handleDescriptionChange = (e) => {

  // }

  return <Dialog open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
    <DialogTitle id="responsive-dialog-title">Add new article</DialogTitle>
    <DialogContent>
      <DialogContentText>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField onChange={(e) => handleTitleChange(e)} id="outlined-multiline-flexible" label="Title" multiline rowsMax={4} variant="outlined" />
            <TextField id="outlined-textarea" label="Author" multiline variant="outlined" />
            <TextField id="outlined-multiline-static" label="Description" multiline rows={4} variant="outlined" />
            <TextField id="outlined-multiline-static" label="Type your article here" multiline rows={4} variant="outlined" />
          </div>
        </form>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose} onClick={addArticle} color="primary">
        Add
          </Button>
      <Button onClick={(e) => addArticle(e, {
        author: "Christina Carrega, CNN",
        title: "dada",
        description: "Anger over federal executions continued to grow Friday after two Black men died by lethal injection within nearly 24 hours.",
        url: "https://www.cnn.com/2020/12/12/us/brandon-bernard-alfred-bourgeois-executions/index.html",
        urlToImage: "https://cdn.cnn.com/cnnnext/dam/assets/201211222907-brandon-bernard-alfred-bourgeois-split-super-tease.jpg",
        publishedAt: "2020-12-12T05:30:00Z",
        content: null
      })} color="primary" autoFocus>
        Cancel
          </Button>
    </DialogActions>
  </Dialog >
}

const MyButton = (props) => {
  const { classes, handleOpen } = props

  return (
    <Fab style={{ position: 'fixed', top: '90vh', right: '5vw' }} onClick={handleOpen} size="medium" color="secondary" aria-label="add" className={classes.margin}>
      <AddIcon />
    </Fab>
  )
}

export default App;
