# query {

#   notes{

#     createdBy{
# 	_id
#      email
#       password

#       createdNotes{

#         title

#         textBody
#         updatedAt

#         createdBy{

#           email

#           password

#         }

#       }

#     }

#   }

# }

# mutation {
#   register(credentials: {email:"newer@email.com", password:"newpass"}){
#     email
#     password
#     token
#   }
# }

# mutation {
#   addNote(content: {title: "a new note", textBody:"here is a text body", updatedAt: "2020-07-18T17:54:29.455"})
#   {
#     _id
#     title
#     textBody
#     createdBy{
#       email
#       password
#     }
#     updatedAt
#   }
# }