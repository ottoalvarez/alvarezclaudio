import jwt from "jsonwebtoken";
import moment from "moment";
import randomstring from "randomstring";

export const getToken = (req, res) => {
    const { body } = req;
    const token = jwt.sign({
            id: randomstring.generate({
                length: 20,
                charset: 'alphanumeric',
                capitalization: 'lowercase'
            }),
            date: moment()
        },
        process.env.KEY, { expiresIn: '1d' }
    );

    res.json({ token });
}