class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config === undefined){
            throw new Error("Config isn't passed");
        }
        this.config = config;
        this.currentState = this.config.initial;
        this.nextState = null;
        this.previousState = null;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        var states = this.config.states;
        if(states.hasOwnProperty(state)){
            this.previousState = this.currentState;
            this.currentState = state;
        }else{
            throw new Error("State isn't exist.");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let states = this.config.states;
        let currentState = this.currentState;
        let hasEvent = states[currentState].transitions.hasOwnProperty(event);
        
        if(hasEvent){
            this.previousState = currentState;
            this.currentState = states[currentState].transitions[event];
        }else{
            throw new Error("Event in current state isn't exist.");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = this.config.states;
        let statesOfEvent = [];

        if(event === undefined){
            return Object.keys(this.config.states);
        }

        for(var nameOfState in states){
            if(states.hasOwnProperty(nameOfState)){
                if(states[nameOfState].transitions.hasOwnProperty(event)){
                    statesOfEvent.push(nameOfState);
                }
            }
        }

        return statesOfEvent;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(!this.previousState){
            return false;
        }
        this.nextState = this.currentState;
        this.currentState = this.previousState;
        this.previousState = null;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(!this.nextState){
            return false;
        }
        this.previousState = this.currentState;
        this.currentState = this.nextState;
        this.nextState = null;
        return true;

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.previousState = null;
        this.nextState = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
