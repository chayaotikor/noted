# {
#   getAllNotes {
#     createdBy {
#       _id
#       email
#       createdNotes {
#         title
#         textBody
#         updatedAt
#         createdBy {
#           email
#         }
#       }
#     }
#   }
# }


# mutation {
#   register(credentials: {email:"newer2@email.com", password:"newpass"}){
#     _id
#     email
#     token
#   }
# }

# mutation {
#   addNote(content: {title: "a new note", textBody:"here is a text body", createdBy:"5f134aa0e7b99404ece12176"})
#   {
#     _id
#     title
#     textBody
#     createdBy{
#       email
#     }
#     updatedAt
#   }
# }

# query{
#  login(email:"newer2@email.com", password:"newpass"){
#    _id,
#    email,
#  }
# }