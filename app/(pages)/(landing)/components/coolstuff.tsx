
const styles = {
    background: {
        background: 'rgb(191, 208, 212)',
        color: 'rgb(246, 246, 237)'
    }
};

export default function Coolstuff() {

    return (
        <div className='p-24 text-center' style={styles.background}>
            <p>Background image related to the app</p>
            <p>Cool stuff goes here: info about the app, features, etc.</p>
            <p>Maybe using sliders or carousel?</p>
        </div>
    )
}