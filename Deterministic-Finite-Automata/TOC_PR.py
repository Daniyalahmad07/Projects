import graphviz

class FiniteAutomaton :
    def __init__(self):
        self.states = []
        self.alphabet = []
        self.transitions = {}
        self.initial_state = None
        self.final_states = []


    #SYMBOL PART : 
    def add_alphabet_symbol(self,symbol) :  #adding symbol
        self.alphabet.append(symbol)
        
    def print_symbol(self,no_of_alphabets) : #printing symbol
        print("ALPHABETS : " , end = "")
        for i in range(no_of_alphabets) :
            print(self.alphabet[i] , end = " ")
        print("")



    #STATE PART :
    def add_states(self,state) :  #adding state
        self.states.append(state)
        
    def print_state(self,no_of_states) : #printing state
        print("STATES : " , end = " ")
        for i in range(no_of_states) :
            print(self.states[i] , end =  " ")
        print("")



    #TRANSITION PART :
    def add_transition(self, from_state, symbol, to_state): #adding transitions
        self.transitions[(from_state, symbol)] = to_state
    def display_transition_table(self) :
        print("\nTransition Table:")
        for state in self.states:
            for symbol in self.alphabet:
                next_state = self.transitions.get((state, symbol), None)
                if next_state:
                    print(f"{state} --({symbol})--> {next_state}")
                else:
                    print(f"{state} --({symbol})-->")
        
    def set_initial_state(self,state) : #setting initial state
        self.initial_state = state
    def print_initial_state(self) : #printing initial state
        print(self.initial_state)

    def add_final_state(self,state) : #add final states
        self.final_states.append(state)
    def print_final_states(self,num_final_states) : #printing final state
        print("FINAL STATES : " , end = " ")
        for i in range(num_final_states) :
            print(self.final_states[i] , end = " ")


    #STRING CHECKER :
    def is_accepted(self, input_string):
        current_state = self.initial_state
        for symbol in input_string:
            if (current_state, symbol) in self.transitions:
                current_state = self.transitions[(current_state, symbol)]
            else:
                return False
        return current_state in self.final_states

    #GRAPH VIEW :
    def visualize_graph(automaton):
        dot = graphviz.Digraph()

        for state in automaton.states:
            dot.node(state, shape='circle')
        dot.node('start', shape='point')
        dot.node('end', shape='doublecircle')

        dot.edge('start', automaton.initial_state)
        for final_state in automaton.final_states:
            dot.edge(final_state, 'end')

        for (from_state, symbol), to_state in automaton.transitions.items():
            dot.edge(from_state, to_state, label=symbol)

        dot.render('automaton_graph', format='png', view=True)


automaton = FiniteAutomaton()
#input of alphabets :
no_of_alphabets=int(input("ENTER THE NUMBER OF ALPHABETS : "))
alphabet=[] #helper list
fl=True
input_count=0

while input_count < no_of_alphabets : #a counter for ensuring that correct number of alphabets are entered
    alphabet_input=input(f"Enter the {input_count+1} alphabet : ") #alphabet input
    if len(alphabet_input) == 1 and alphabet_input not in alphabet: #check wether the entered symbol is a single character or not 
        automaton.add_alphabet_symbol(alphabet_input) #passing the symbol to the add_alphanet member function
        alphabet.append(alphabet_input)
        input_count += 1
    else :
        print("INCORRECT TRANSITION SYMBOL/REPETITIVE SYMBOLS")

automaton.print_symbol(input_count) #passing the number of symbols to the print_sumbol member function to print the symbols


#input of number of states :
no_of_states=int(input("NUMBER OF STATES : "))
i=0
states = [] #helper list
while i < no_of_states : 
    state = input(f"Enter the {i+1} state : ")
    if state not in states :  #checks wether the state given is already there or not 
        automaton.add_states(state)
        states.append(state)
        i += 1
    else :
        print("NO REPETITION ALLOWED")

automaton.print_state(no_of_states)


#input of transitions :
no_of_transitions = int(input("ENTER THE NUMBER OF TRANSITIONS : "))

for i in range(no_of_transitions) : #passing the transitions to the add_transitions member funciton
    from_state, symbol, to_state = input(f"Enter transition {i+1} (from_state symbol to_state): ").split()
    automaton.add_transition(from_state, symbol, to_state)


while True :
    initial_state = input("ENTER THE INITIAL STATE : ") #initial state 
    if initial_state in states :
        automaton.set_initial_state(initial_state)
        break
    else :
        print("ENTER A VALID STATE")

automaton.print_initial_state()



fl = True
while fl == True :
    num_final_states = int(input("ENTER THE NUMBER OF FINAL STATES : "))
    i = 0
    if num_final_states <= no_of_states :
        while i < num_final_states :
            final_state = input(f"ENTER THE FINAL STATE {i+1} : ")
            if final_state in states :
                automaton.add_final_state(final_state)
                i += 1
            else :
                print("ENTER A VALID STATE")
        else :
            fl = False

    else :
        print("ENTER THE NUMBER WITHIN A VALID RANGE")

automaton.print_final_states(num_final_states)  # printing final state

automaton.display_transition_table() #printing transition table

while True:
    input_string = input("Enter a string to validate (or type 'quit' to exit): ")
    if input_string.lower() == "quit":
        break
    elif automaton.is_accepted(input_string):
        print("String is accepted by the automaton.")
    else:
        print("String is not accepted by the automaton.")

visualize_graph(automaton)
