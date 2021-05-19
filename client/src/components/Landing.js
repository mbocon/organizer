export default function Landing() {
    return(
        <div className="landing">
            <h1  style={{textAlign: 'center'}}>Welcome to organizer!</h1>
            <p style={{width: '80%', marginBottom: '2rem'}} >The all-in-one application designed to get you organized! Loaded with a ton of features to help you track your budget, goals, workouts, diet, journals and more!</p>
            <div className="landing-buttons">
                <a href="/register"><button className="btn btn-primary" style={{width: '100px'}}>Register</button></a>
                <p style={{marginTop: '1rem', textAlign: 'center'}}>or</p>
                <a href="/login"><button className="btn btn-primary" style={{paddingLeft: '12px', paddingRight: '12px', width: '100px'}}>Login</button></a>

            </div>
        </div>
    )
}