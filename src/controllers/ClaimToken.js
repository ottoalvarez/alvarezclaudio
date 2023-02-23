import jwt from "jsonwebtoken";
import moment from "moment";
import randomstring from "randomstring";

export const getToken = (req, res) => {
    try {

        const { username, password, fullname, email } = req.body.data;

        const token = jwt.sign({
                id: randomstring.generate({
                    length: 20,
                    charset: 'alphanumeric',
                    capitalization: 'lowercase'
                }),
                date: moment(),
                username,
                password,
                fullname,
                email
            },
            process.env.KEY, { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (error) {
        res.json({ error })
    }
}