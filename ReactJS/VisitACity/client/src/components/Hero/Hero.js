import styles from './Hero.module.css';

export const Hero = () => (
    <div className="bg">
        <div className="text-center page-header">
            <h1 className="display-4">Welcome to Visit<span className="feature-icon"><i className="fa fa-mountain"></i></span>City</h1>
            <h2>
                Create Your Personal Travel Guide
                <a>Here</a>
            </h2>
            <br />
            <h3 className="display-12">Where are you travelling to?</h3>
        </div>
        <form className="col-md-6 offset-md-3">
            <div className="form-group col-md-6 offset-md-3">
                <input name="cityName" className="form-control" placeholder="City" />
            </div>
            <fieldset className="col-md-6 offset-md-4">
                <div className="form-check" style={{color: 'white'}}>
                    <input className="form-check-input" type="radio" name="radioOption" id="exampleRadios1" defaultValue="Attractions" defaultChecked />
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            Attractions
                        </label>
                    </div>
                <div className="form-check" style={{color: 'white'}}>
                    <input className="form-check-input" type="radio" name="radioOption" id="exampleRadios2" defaultValue="Restaurants" />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Restaurants
                        </label>
                    </div>
            </fieldset>
            <button type="submit" className="btn btn-primary col-md-3 offset-md-4">Search</button>
        </form>
        <div classes={`h-10 d-inline-block ${styles['container']}`}>
            <div className="row align-items-center">
                <div className="col-sm">
                    <div className="feature-icon">
                        <i className="fa fa-city"></i> <span>0 Cities</span>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="feature-icon">
                        <i className="fa fa-eye"></i> <span>0 Attractions</span>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="feature-icon">
                        <i className="fa fa-utensils"></i> <span>0 Restaurants</span>
                    </div>
                </div>
            </div>
        </div>
        <br />
    </div>
)