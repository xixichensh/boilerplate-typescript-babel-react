import { connect } 			from 'react-redux';
import HomeComponent 		from './home-component';

const mapDispatchToProps = (dispatch:any, props:any) => {
    return {};
}

const mapStateToProps = (state:any) => {
    return {};
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent)

export default Home;