import ProfileStatus from "./ProfileStatus";
import React from 'react';
import {create} from "react-test-renderer"

describe('ProfileStatus component test', () => {
    test('Status from props shold be in state', () => {
        const component = create(<ProfileStatus status='it-kamasutra'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('it-kamasutra');
    });
    test(`<span> should be displayed`, () => {
        const component = create(<ProfileStatus status='it-kamasutra'/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test(`<span> text should displayed from status`, () => {
        const component = create(<ProfileStatus status='it-kamasutra'/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe('it-kamasutra');
    });
    test(`<input> shouldn't displayed`, () => {
        const component = create(<ProfileStatus status='it-kamasutra'/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
    test(`<input> should be displayed in edit mode instead of <span>`, () => {
        const component = create(<ProfileStatus status='it-kamasutra'/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input")
        expect(input.props.value).toBe('it-kamasutra');
    });
    test(`Callback shoul be called`, () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='it-kamasutra' updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});