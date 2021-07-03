Covid Tracker
Problem:
Build an application to calculate covid risk for users where users can register and tell if they have any symptoms, travel history, or came in contact with any positive patient. Based on which application will calculate and return the risk percentage of the user.

USER:
You need to provide following options for User:
Register: A user can register by mobile number and pincode.
Self Assessment: Users can enter:
Any symptoms (cough, sore throat,etc).
Any Travel history in the last 15 days.
Any contact with covide positive patient.
Covid Risk: Users can see the risk of being affected by Covid based on self assessment.

Risk Calculation:
No symptoms, No travel history, No contact with covid positive patient - Risk = 5%
Any one out of symptoms, travel history or contact with covid positive patient is true - Risk = 50%
Any two out of symptoms, travel history or contact with covid positive patient is true - Risk = 75%
All 3 symptoms, travel history or contact with covid positive patient is true - Risk = 95%

INPUT:
RegisterUser(ABC,9999999999,560037);
SelfAssessment(UserId,Y, N, N);

OUTPUT:
Risk is 50%

ADMIN:
You need to provide Admin options for Covid Healthworkers:
Register: Covid Healthworkers can register by mobile number and pin code on user’s behalf
Covid Result: Health workers can enter the result of covid tests for patients.
Health workers can also mark already registered user as Recovered.

INPUT:
RegisterUser(ABC,9999999999,560037);
CovidResult(AdminId, UserId, Y);

OUTPUT:
Record of UserId saved successfully as Positive

ZONES:
Mark zones(pincodes) as green, orange and red based on positive covid cases
Default zone - GREEN
<5 cases in a zone - ORANGE
>5 cases in a zone - RED

INPUT:
GetZone(560037);

OUTPUT:
No. of positive cases: 1
ORANGE

Bonus:
Change zones(pincodes) to green, orange and red based on positive covid cases in last few days:
No cases in last 30 days in a zone - GREEN
<5 cases in a zone in last 15 days - ORANGE
>5 cases in a zone in last 15 days - RED
 							
Expectations:						
Create the sample data yourself. You can put it into a file, test case or main driver program itself.
The code should be demo-able. Either by using the main driver program or test cases. 	
The code should be modular. The code should have the basic OO design. Please do not jam in
the responsibilities of one class into another.					
The code should be extensible. Wherever applicable, use interfaces and contracts between different methods. It should be easy to add/remove functionality without rewriting the entire codebase. 							
The code should handle edge cases properly and fail gracefully. 
The code should be legible, readable and DRY.
Database integration is not required. 
Guidelines:
		 	 	 		
Please do not access the internet for anything EXCEPT syntax.
You are free to use the language and IDE of your choice.
The entire code should be your own. 
