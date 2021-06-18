import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeContainer from '../../container/HomeContainer';

const RouterWrap = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' excact>
                    <HomeContainer />
                </Route>
            </Switch>
        </Router>
    )
}

export default RouterWrap
