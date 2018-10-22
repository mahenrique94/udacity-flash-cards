import React from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import i18n from '../../_translate/i18n'

import { colors } from '../../helpers/colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    correct: {
        backgroundColor: colors.default,
        borderRadius: 7,
        height: 45,
        marginBottom: 16,
        padding: 10
    },
    correctText: {
        color: colors.text,
        fontSize: 22,
        textAlign: 'center'
    },
    inCorrect: {
        backgroundColor: '#ff463f',
        borderRadius: 7,
        height: 45,
        padding: 10
    },
    inCorrectText: {
        color: colors.default,
        fontSize: 22,
        textAlign: 'center'
    }
})

class Quiz extends React.Component {

    state = {
        correctAnswers: 0,
        questionIndex: 0,
        shouldShowAnswer: false
    };

    render() {
        const { navigation } = this.props
        const { questionIndex, correctAnswers, shouldShowAnswer } = this.state;
        const { questions } = navigation.state.params;
        const isQuestionAvailable = questionIndex < questions.length;
        const questionLeft = questions.length - questionIndex;

        return (
            <View style={ { flex: 1 } }>
                {isQuestionAvailable ? (
                    <View style={ styles.container }>
                        <View style={ [ styles.group, { flex: 1, justifyContent: 'flex-start', marginLeft: 16 } ] }>
                            <View>
                                <Text>{ questionLeft } / { questions.length }</Text>
                            </View>
                        </View>
                        <View style={ [ styles.group, { flex: 4 } ] }>
                            <View>
                                {shouldShowAnswer ? (
                                    <View style={ { alignItems: 'center' } }>
                                        <Text style={ { fontSize: 36 } }>{ questions[questionIndex].answer }</Text>
                                        <TouchableOpacity onPress={ this.showAnswer }>
                                            <Text style={ { color: '#70dd2f', fontSize: 18 } }>{ i18n.t('buttons.question') }</Text>
                                        </TouchableOpacity>
                                    </View>) : (
                                        <View style={ { alignItems: 'center' } }>
                                            <Text style={ { fontSize: 36 } }>{ questions[questionIndex].question }</Text>
                                            <TouchableOpacity onPress={ this.showAnswer }>
                                                <Text style={ { color: '#ff463f', fontSize: 18 } }>{ i18n.t('buttons.answer') }</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                            </View>
                        </View>
                        <View style={ { flex: 4, margin: 24 } }>
                            <TouchableOpacity onPress={ this.onCorrect } style={ styles.correct }>
                                <Text style={ styles.correctText }>{ i18n.t('buttons.correct') }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ this.onIncorrect } style={ styles.inCorrect }>
                                <Text style={ styles.inCorrectText }>{ i18n.t('buttons.incorrect') }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                        <View style={ styles.container }>
                            <Text style={ { marginLeft: 16 } }>{ i18n.t('labels.score') }&nbsp;{ correctAnswers }</Text>
                            <View style={ { alignItems: 'center', flex: 4, justifyContent: 'space-around' } }>
                                <View style={ styles.container }>
                                    <TouchableOpacity onPress={ this.startQuiz } style={ styles.correct }>
                                        <Text style={ styles.correctText }>{ i18n.t('buttons.startQuiz') }</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ this.backToDeck } style={ styles.inCorrect }>
                                        <Text style={ styles.inCorrectText }>{ i18n.t('buttons.backToDeck') }</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
            </View>
        )
    }

    backToDeck = () => {
        const { navigation } = this.props
        navigation.goBack()
    }

    onCorrect = () => this.setState(({ questionIndex, correctAnswers }) => ({ questionIndex: ++questionIndex, correctAnswers: ++correctAnswers, shouldShowAnswer: false }))

    onIncorrect = () => this.setState({ questionIndex: this.state.questionIndex + 1 })

    showAnswer = () => this.setState({ shouldShowAnswer: !this.state.shouldShowAnswer })

    startQuiz = () => this.setState({ questionIndex: 0, correctAnswers: 0, shouldShowAnswer: false })
}


export default Quiz
