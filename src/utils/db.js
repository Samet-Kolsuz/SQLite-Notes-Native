import { Export, UserEdit } from 'iconsax-react-nativejs';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'NoteAppDB',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.log('Error opening database: ', error);
  },
);

export const initializeDatabase = () => {
  db.transaction(
    tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, location TEXT)',
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER NOT NULL, title TEXT, description TEXT, FOREIGN KEY(userid) REFERENCES Users(id))',
      );
    },
    error => {
      console.log('Error initializing database: ', error);
    },
  );
};

export default db;

export const insertUserInfoNotExists = async user => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Users WHERE email= ?',
        [user.email],
        (tx, results) => {
          if (results.rows.length > 0) {
            reject({ success: false, message: 'User already exists' });
          } else {
            tx.executeSql(
              'INSERT INTO Users (username, email, password, location) VALUES (?, ?, ?, ?)',
              [user.username, user.email, user.password, user.location],
              (_,results) => {


                resolve({
                  success: true,
                  message: 'User registered successfully',
                  Userid: results.insertId
                });
              },
              (_,error) => {
                reject({ success: false, error: error.message || 'Error registering user' });
              },
            );
          }
        },
      );
    });
  });
};

export const getUserFromDb = async (id) =>{
  return new Promise((resolve,reject)=>{
    db.transaction(tx=>{
      tx.executeSql(
        "SELECT * FROM Users WHERE id=?",[id],
        (_,results)=>{
          if(results.rows.length > 0){
            const user = results.rows.item(0);
            resolve({success:true,message:"kullanici basariyla getirildi",user});
          }else{
            reject({success:false,message:'User not found'});
          }
        },
        (_,error)=>{
          reject({success:false,message:error.message || 'Error getting user'});
        }
      )
    })

  })
}

export const LoginFromDb = async (email, password) => {

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM Users WHERE email = ?",[email],

        (tx,results)=>{
          if(results.rows.length > 0){
            const user = results.rows.item(0);
            if(user.password === password){
              resolve({success:true,message:'User logged in successfully',user});
            }else{
              reject({success:false,message:'Invalid email or password'});
            }
          }else{
            reject({success:false,message:'Invalid email or password'});
          }
        },
        (_, error) => {
          reject({ success: false, message: error.message || 'Error logging in user' });
        }
      );
    });
  });

}


// not foksiyonlari

// not olusturma
export const insertNoteDb = ({userid,title,description}) =>{
  return new Promise ((resolve,reject)=>{

    db.transaction(tx=>{
      tx.executeSql(
        "INSERT INTO Notes (userid, title, description) VALUES (?,?,?)", 
        [userid, title, description],
        (tx,results) => {
          tx.executeSql(
            "SELECT * FROM Notes WHERE id = ?",
            [results.insertId],
            (_,selectResults) => {
              resolve({
                success:true,
                message:"Not başarıyla eklendi",
                note:selectResults.rows.item(0)
              });
            },
            (_,selectError) => {
              reject({success:false,message:selectError.message || "Not alınırken hata oluştu"});
            }
          );
        },
        (_,error) => {
          reject({success:false,message:error.message || "Not eklenirken hata oluştu"});
        }
      )
    })
  })
}



// butun notlari alma

export const getAllNotesFromDb = ({ userid }) => {
    return new Promise((resolve, reject) => {

        db.transaction(tx =>

            tx.executeSql(
                'SELECT * FROM Notes WHERE userid = ?',
                [userid],
                (_, results) => {
                    const len = results.rows.length;
                    const notes = [];
                    for (let i = 0; i < len; i++) {
                        notes.push(results.rows.item(i));
                    }

                    resolve(notes);
                },

                (_, error) => {
                    reject(error);
                }
            )

        )
    })
}

// not silme


export const deleteNoteFromDb = async (noteId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM Notes WHERE id = ?",
        [noteId],
        (_, results) => {
          if (results.rowsAffected > 0) {
            resolve({ success: true, message: "Not başarıyla silindi" });
          } else {
            reject({ success: false, message: "Not bulunamadı" });
          }
        },
        (_, error) => {
          reject({ success: false, message: error.message || "Not silinirken hata oluştu" });
        }
      );
    });
  });
};

// var olan notu guncelleme
export const updateNoteFromDb = async ({ noteId, title, description, userid }) => {

    console.log("db güncelleme fonksiyonu çalıştı")

    return new Promise((resolve, reject) => {

        db.transaction(tx =>
            tx.executeSql(
                'UPDATE Notes SET title = ?, description = ? WHERE id = ?;',
                [title, description, noteId],
                (tx, result) => {
                    // güncelleme işlemi başarılıysa bütün notları SQL kullanarak tekrardan alalım ve cevap olarak gönderelim
                    tx.executeSql(
                        'SELECT * FROM Notes WHERE userid = ?',
                        [userid],
                        (_, results) => {
                            const len = results.rows.length;
                            const notes = [];
                            for (let i = 0; i < len; i++) {
                                notes.push(results.rows.item(i));
                            }

                            resolve({
                                success: true,
                                message: "Not başarıyla güncellendi.",
                                data: notes
                            });
                        },

                        (_, error) => {
                            reject(error);
                        }
                    )
                },

                (_, error) => {
                    console.error('Error', error);
                    reject({
                        success: false,
                        message: "Not güncellenirken hata oluştu."
                    })
                }
            )
        )

    })

}