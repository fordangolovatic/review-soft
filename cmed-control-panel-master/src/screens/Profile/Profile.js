import useProfile from '../../services/hooks/useProfile';


const Profile = () => {
    // eslint-disable-next-line no-unused-vars
    const { data, error, loaded } = useProfile();


    return(
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>

        </div>
    )
}

export default Profile;