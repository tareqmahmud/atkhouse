import React, {useContext, useEffect} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import '../../styles/Switch.css';
import firebase from '../../config/firebase';
import {AuthContext} from '../../context/AuthContext';

const Switch = () => {
    const themeContext = useContext(ThemeContext);
    const context = useContext(AuthContext);
    const currentUserId = context.currentUser.uid;

    const updateLightStatus = async () => {
        const firebaseDatabase = firebase.database().ref('/LedStatus');
        await firebaseDatabase.child(currentUserId).update({
            'light_status': !themeContext.light_status
        })
    };

    useEffect(() => {
        firebase.database().ref('/LedStatus/' + currentUserId).on('value', snapshot => {
            const lightStatusData = snapshot.val();
            themeContext.setLightStatus({
                light_status: lightStatusData.light_status
            });
        })
    }, []);

    return (
        <div className="col-md-12 mt-5">
            <label>
                <input type="checkbox"
                       checked={themeContext.light_status}
                       onChange={updateLightStatus}/>
                <span className="check"/>
                <span className="light off">Off</span>
                <span className="light on">On</span>
            </label>
        </div>
    )
}

// class Switch extends React.Component {
//     static contextType = ThemeContext;
//     const
//     context = useContext(AuthContext);
//     const
//     currentUserId = context.currentUser.uid;
//
//     updateLightStatus = () => {
//         firebase.firestore().collection('LEDStatus').doc('rycUkHyKsUl0NnS0Ocxi').update({
//             'light_status': !this.context.light_status
//         });
//     };
//
//     componentDidMount() {
//         firebase.firestore().collection('LEDStatus').doc('rycUkHyKsUl0NnS0Ocxi').onSnapshot(doc => {
//             if (doc.exists) {
//                 this.context.setLightStatus({
//                     light_status: doc.data().light_status
//                 })
//             }
//         })
//     }
//
//     render() {
//         const context = this.context;
//         return (
//             <div className="col-md-12 mt-5">
//                 <label>
//                     <input type="checkbox"
//                            checked={context.light_status}
//                            onChange={this.updateLightStatus}/>
//                     <span className="check"/>
//                     <span className="light off">Off</span>
//                     <span className="light on">On</span>
//                 </label>
//             </div>
//         )
//     }
// }

export default Switch;