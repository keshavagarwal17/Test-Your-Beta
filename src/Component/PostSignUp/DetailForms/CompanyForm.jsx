import React from 'react'
import { Button, Form, Container, Segment } from "semantic-ui-react";
import { useState, useEffect, useContext } from "react";


const CompanyForm = () => {
    const [data, setData] = useState({});
    const labelStyle = { fontSize: "15px" };
    const typesOfProducts = [{"cat_key":"APPLICATION","name":"All apps"},{"cat_key":"GAME","name":"All games"},{"cat_key":"ART_AND_DESIGN","name":"Art & Design"},{"cat_key":"AUTO_AND_VEHICLES","name":"Auto & Vehicles"},{"cat_key":"BEAUTY","name":"Beauty"},{"cat_key":"BOOKS_AND_REFERENCE","name":"Books & Reference"},{"cat_key":"BUSINESS","name":"Business"},{"cat_key":"COMICS","name":"Comics"},{"cat_key":"COMMUNICATION","name":"Communication"},{"cat_key":"DATING","name":"Dating"},{"cat_key":"EDUCATION","name":"Education"},{"cat_key":"ENTERTAINMENT","name":"Entertainment"},{"cat_key":"EVENTS","name":"Events"},{"cat_key":"FINANCE","name":"Finance"},{"cat_key":"FOOD_AND_DRINK","name":"Food & Drink"},{"cat_key":"HEALTH_AND_FITNESS","name":"Health & Fitness"},{"cat_key":"HOUSE_AND_HOME","name":"House & Home"},{"cat_key":"LIFESTYLE","name":"Lifestyle"},{"cat_key":"MAPS_AND_NAVIGATION","name":"Maps & Navigation"},{"cat_key":"MEDICAL","name":"Medical"},{"cat_key":"MUSIC_AND_AUDIO","name":"Music & Audio"},{"cat_key":"NEWS_AND_MAGAZINES","name":"News & Magazines"},{"cat_key":"PARENTING","name":"Parenting"},{"cat_key":"PERSONALIZATION","name":"Personalization"},{"cat_key":"PHOTOGRAPHY","name":"Photography"},{"cat_key":"PRODUCTIVITY","name":"Productivity"},{"cat_key":"SHOPPING","name":"Shopping"},{"cat_key":"SOCIAL","name":"Social"},{"cat_key":"SPORTS","name":"Sports"},{"cat_key":"TOOLS","name":"Tools"},{"cat_key":"TRAVEL_AND_LOCAL","name":"Travel & Local"},{"cat_key":"VIDEO_PLAYERS","name":"Video Players & Editors"},{"cat_key":"WEATHER","name":"Weather"},{"cat_key":"LIBRARIES_AND_DEMO","name":"Libraries & Demo"},{"cat_key":"GAME_ARCADE","name":"Arcade"},{"cat_key":"GAME_PUZZLE","name":"Puzzle"},{"cat_key":"GAME_CARD","name":"Cards"},{"cat_key":"GAME_CASUAL","name":"Casual"},{"cat_key":"GAME_RACING","name":"Racing"},{"cat_key":"GAME_SPORTS","name":"Sport Games"},{"cat_key":"GAME_ACTION","name":"Action"},{"cat_key":"GAME_ADVENTURE","name":"Adventure"},{"cat_key":"GAME_BOARD","name":"Board"},{"cat_key":"GAME_CASINO","name":"Casino"},{"cat_key":"GAME_EDUCATIONAL","name":"Educational"},{"cat_key":"GAME_MUSIC","name":"Music Games"},{"cat_key":"GAME_ROLE_PLAYING","name":"Role Playing"},{"cat_key":"GAME_SIMULATION","name":"Simulation"},{"cat_key":"GAME_STRATEGY","name":"Strategy"},{"cat_key":"GAME_TRIVIA","name":"Trivia"},{"cat_key":"GAME_WORD","name":"Word Games"},{"cat_key":"FAMILY","name":"Family All Ages"},{"cat_key":"FAMILY_ACTION","name":"Family Action"},{"cat_key":"FAMILY_BRAINGAMES","name":"Family Brain Games"},{"cat_key":"FAMILY_CREATE","name":"Family Create"},{"cat_key":"FAMILY_EDUCATION","name":"Family Education"},{"cat_key":"FAMILY_MUSICVIDEO","name":"Family Music & Video"},{"cat_key":"FAMILY_PRETEND","name":"Family Pretend Play"}]
    const formElement = [
        {
            label: "Company Name",
            placeholder: "Write Company Name",
            name: "companyName",
            type: "text",
            isTextArea: false,
        },
        {
            label: "Types of Products",
            placeholder: "Mention the types of products you build",
            name: "productType",
            type: "text",
            isTextArea: false,
        },
    ]
    const setInfo = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      };
    const renderFormElements = () => {
        return formElement.map((ele, index) => (
          <Form.Field>
            <label style={labelStyle} className="label">
              {ele.label}
            </label>
            {ele.isTextArea ? (
              <textarea
                name={ele.name}
                style={{ minHeight: 150 }}
                placeholder={ele.placeholder}
                type={ele.type}
                onChange={(e) => setInfo(e)}
                required
              />
            ) : (
              <input
                type={ele.type}
                name={ele.name}
                placeholder={ele.placeholder}
                onChange={(e) => setInfo(e)}
                required
              />
            )}
          </Form.Field>
        ));
      };
    return (
        <div>
            <Segment style={{ paddingLeft: '2vw', marginTop: '5vh' }}>
                <h2 style={{ marginBottom: '5vh' }}>Company Details</h2>
                <Form>
                    {renderFormElements()}
                    <Button
                    color="green"
                    style={{ marginTop: "2%" }}
                    type="submit"
                    onClick={() => {}}
                    >
                    Submit
                    </Button>
                </Form>
            </Segment>
        </div>
    )
}

export default CompanyForm
