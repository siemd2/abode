import Nav from '../components/Nav'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        budget: "",
        bedrooms: "",
        bathrooms: "",
        stories: "",
        mainroad: true,
        guestroom: true,
        basement: true,
        prefarea: "",
        parking: false,
        furnishingstatus: false,
        kids: "",
        url: "",
        hotwaterheating: true,
        matches: []
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        console.log({formData})
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', {formData})
            console.log(response)
            console.log(response.data.form)
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name
        console.log(name)
        console.log(value)

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
        console.log(formData)
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding">
                <h2>Enter your preferences</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label>Budget</label>
                        <input
                            id="budget"
                            type='number'
                            name="budget"
                            placeholder="$$$"
                            required={true}
                            value={formData.budget}
                            onChange={handleChange}
                        />
                        <label>Square Footage</label>
                        <input
                            id="prefarea"
                            type='number'
                            name="prefarea"
                            placeholder="ft²"
                            required={true}
                            value={formData.prefarea}
                            onChange={handleChange}
                        />
                        <div className = "multicontainer">
                            <div className = "container">
                                <label>Bedrooms</label>
                                <input
                                    id="bedrooms"
                                    type='number'
                                    name="bedrooms"
                                    placeholder=""
                                    required={true}
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className = "container">
                                <label>Bathrooms</label>
                                <input
                                    id="bathrooms"
                                    type='number'
                                    name="bathrooms"
                                    placeholder=""
                                    required={true}
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className = "container">
                                <label>Stories</label>
                                <input
                                    id="stories"
                                    type='number'
                                    name="stories"
                                    placeholder=""
                                    required={true}
                                    value={formData.stories}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <label>Kids</label>
                        <input
                            id="kids"
                            type='number'
                            name="kids"
                            placeholder=""
                            required={false}
                            value={formData.kids}
                            onChange={handleChange}
                        />
                        <div className = "check-container">
                            <div className = "multicontainer">
                                <label>Parking?</label>
                                <input
                                    id="parking"
                                    type="checkbox"
                                    name="parking"
                                    onChange={handleChange}
                                    checked={formData.parking}
                                />
                            </div>
                            <div className = "multicontainer">
                                <label>Air Conditioning?</label>
                                <input
                                    id="airconditioning"
                                    type="checkbox"
                                    name="airconditioning"
                                    onChange={handleChange}
                                    checked={formData.airconditioning}
                                />
                            </div>
                            <div className = "multicontainer">
                                <label>Furnished?</label>
                                <input
                                    id="furnishingstatus"
                                    type="checkbox"
                                    name="furnishingstatus"
                                    onChange={handleChange}
                                    checked={formData.furnishingstatus}
                                />
                            </div>
                        </div>
                        <input type="submit"/>
                    </section>


                </form>
            </div>
        </>
    )
}
export default OnBoarding