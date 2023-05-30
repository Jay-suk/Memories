import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'contain',
    width: '40vw',
    height: '100%',
    maxHeight: '600px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  recImage: {
    objectFit: 'contain',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  thumbnail: {
    cursor: 'pointer',
  },
  popup: {
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupImage: {
    maxWidth: '90%',
    maxHeight: '90%',
  },
  closeButton: {
    color: '#fff',
    fontSize: '30px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '10px',
    right: '20p',
    cursor: 'pointer',
  }
}));